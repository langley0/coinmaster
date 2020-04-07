import alt from "../alt";
import { decorate, action, observable, runInAction } from "mobx";
import SlotActions from "../actions/SlotActions";
import { formatInt } from "../utils";
import GameActions from "../actions/GameActions";

class SlotState {
    spinning = false;
    reels = [{ top: 0 }, { top: 0}, {top: 0}];
    rewardText = "";
}

decorate(SlotState, {
    spinning: observable,
    reels: observable,
    rewardText: observable,
});

const numIconsPerReel = 6;
const singleHeight = 90;

const slotMachine = {
    stripHeight: singleHeight * numIconsPerReel,
    alignmentOffset: singleHeight/2,
    firstReelStopTime: 667,
    secondReelStopTime: 575,
    thirdReelStopTime: 568,
    payoutStopTime: 0,
    reelSpeedDifference: 0,
    reelSpeed1Delta: 100,
    reelSpeed1Time: 0,
    reelSpeed2Delta: 100,
    positioningTime: 200,
    bounceHeight: 200,
    bounceTime: 1e3,
    winningsFormatPrefix: "",
};

class SlotStore {
    constructor() {
        this.bindListeners({
            handleStartSpin: SlotActions.START_SPIN,
            handleSpinSuccessed: SlotActions.SPIN_SUCCESSED,
        });

        this.exportPublicMethods({
            getState: this.getState
        });

        this.state = new SlotState();
    }

    getState() {
        return this.state;
    }

    handleStartSpin() {
        if (!this.state.spinning) {
            this.state.spinning = true;
            this.state.resultText = "";
            
            // 스핀을 시작한다
            const timer1 = this._startReelSpin(0, 0);
            const timer2 = this._startReelSpin(1, slotMachine.secondReelStopTime);
            const timer3 = this._startReelSpin(2, slotMachine.secondReelStopTime + slotMachine.thirdReelStopTime);
            
            this.timers = [timer1, timer2, timer3];
            this.expired = false;
            this.resultReels = null;

            // 서버로부터의 결과가 빨리 와도 일정시간이 되기전에는 멈추지 않는다
            window.setTimeout(() => {
                this.expired = true;
                if (this.resultReels) {
                    this._stopFunc(this.resultReels);
                }
            }, slotMachine.firstReelStopTime);
        }
    }

    handleSpinSuccessed(result) {
        this.resultReels = result;
        if (this.expired) {
            this._stopFunc(this.resultReels);
        }
    }

    _stopFunc(result) {
        if (this.state.spinning) {
            let timeAfter = 0;
            const { reels, reward }  = result;
            
            setTimeout(() =>{
                this._stopReelSpin(0, reels[0]);
            }, timeAfter);
            
            timeAfter += slotMachine.secondReelStopTime;
            window.setTimeout(() => {
                this._stopReelSpin(1, reels[1]);
            }, timeAfter);
            
            timeAfter += slotMachine.thirdReelStopTime;
            window.setTimeout(() => {
                this._stopReelSpin(2, reels[2]);
            }, timeAfter);
            
            timeAfter += slotMachine.payoutStopTime;
            window.setTimeout(() => {
                this._endSpin(reward);
            }, timeAfter);
        }
    }

    _startReelSpin(index, reelTime) {
        const startTime = Date.now()
        const timer = window.setInterval(() => {
            let top = this.state.reels[index].top;
            top += (index + 1) * slotMachine.reelSpeedDifference;
            top += (Date.now() < startTime + slotMachine.reelSpeed1Time + reelTime) ? slotMachine.reelSpeed1Delta : slotMachine.reelSpeed2Delta;
            top > 0 && (top += 2 * -slotMachine.stripHeight);
            
            runInAction(() => {
                this.state.reels[index].top =  top;
            });
        });
        return timer;
    }

    _stopReelSpin(index, target) {
        if (this.state.spinning) {
            if (this.timers) {
                clearInterval(this.timers[index]);
            }

            const e = slotMachine.stripHeight / numIconsPerReel;
            const top = -slotMachine.stripHeight - (target - 1) * e + slotMachine.alignmentOffset;

            runInAction(() => {
                this.state.reels[index].top = top;
            });
        }
    }

    _endSpin(reward) {
        if (reward.gold) {
            this.state.resultText = formatInt(reward.gold);
        } else if (reward.attack) {
            this.state.resultText = "ATTACK";
        } else if (reward.raid) {
            this.state.resultText = "RAID";
        } else if (reward.shield) {
            this.state.resultText = "SHIELD";
        } else if (reward.energy) {
            // TODO: 나중에 숫자를 서버로부터 받은 값을 사용한다
            this.state.resultText = "10 SPIN";
        }

        if (reward.raid || reward.attack) {
            setTimeout(() => {
                if (reward.raid) {
                    GameActions.goRaid(); // 나중에 전환 이펙트를 넣어야 한다
                } else if (reward.attack) {
                    GameActions.goAttack() ;
                }
                runInAction(() => {
                    this.state.spinning = false;
                });
            }, 2000);
        } else {
            this.state.spinning = false;
        }
    }   

}

decorate(SlotStore, {
    handleStartSpin: action,
    _startReelSpin: action,
    _stopReelSpin: action,
    _endSpin: action,
});

export default alt.createStore(SlotStore, "SlotStore");