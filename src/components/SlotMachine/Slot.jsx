import React from "react";
import { observer } from "mobx-react";
import { format } from "../../utils";
import PlayerStore from "../../stores/PlayerStore";
import PlayerActions from "../../actions/PlayerActions";
import Reel from "./Reel";


const numIconsPerReel = 6;
const singleHeight = 90;

class Slot extends React.Component {
    static slotMachine = {
        stripHeight: singleHeight * numIconsPerReel,
        alignmentOffset: singleHeight/2,
        firstReelStopTime: 667,
        secondReelStopTime: 575,
        thirdReelStopTime: 568,
        payoutStopTime: 100,
        reelSpeedDifference: 0,
        reelSpeed1Delta: 100,
        reelSpeed1Time: 0,
        reelSpeed2Delta: 100,
        positioningTime: 200,
        bounceHeight: 200,
        bounceTime: 1e3,
        winningsFormatPrefix: "",
    };
    
    constructor(){
        super();
        
        this.state = {
            reels: [{ top: 0, left: 10 }, { top: 0, left: 158, }, { top: 0, left: 304, }],
            spinning: false,
            resultText: null,
            now: Date.now(),
        }
    }

    updateNow() {
        this.setState({ now: Date.now() });
    }

    componentDidMount() {
        this.timeUpdator = setInterval(this.updateNow.bind(this), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(this.timeUpdator);
    }

    setReward(reward) {
        if (reward.gold) {
            this.setState({ resultText: format(reward.gold) });
        }
    }

    spin() {
        const slotMachine = Slot.slotMachine;
        this.setState(prev => {
            if(!prev.spinning) {
                const timer1 = this.startReelSpin(0, 0);
                const timer2 = this.startReelSpin(1, slotMachine.secondReelStopTime);
                const timer3 = this.startReelSpin(2, slotMachine.secondReelStopTime + slotMachine.thirdReelStopTime);

                this.timers = [timer1, timer2, timer3];
                
                
                const stopFunc = (result) => {
                    let timeAfter = 0;
                    const { reels, reward }  = result;
                    setTimeout(() =>{
                        this.stopReelSpin(0, reels[0]);
                    }, timeAfter);
                    timeAfter += slotMachine.secondReelStopTime;
                    window.setTimeout(() => {
                        this.stopReelSpin(1, reels[1]);
                    }, timeAfter);
                    timeAfter += slotMachine.thirdReelStopTime;
                    window.setTimeout(() => {
                        this.stopReelSpin(2, reels[2]);
                    }, timeAfter);
                    
                    timeAfter += slotMachine.payoutStopTime;
                    window.setTimeout(() => {
                        this.setReward(reward);
                        this.endSpin();
                    }, timeAfter);
                };

                let expired = false, resultReels = null;

                // 서버로부터의 결과가 빨리 와도 일정시간이 되기전에는 멈추지 않는다
                window.setTimeout(function() {
                    expired = true;
                    if (resultReels) {
                        stopFunc(resultReels);
                    }
                }, slotMachine.firstReelStopTime);
                
                // 스핀 요청을 한다
                // TODO : 결과를 얻어오고 그 결과에 맞추어서 룰렛을 멈출수 있어야 한다
                PlayerActions.spin(result => {
                    resultReels = result;
                    if (expired) {
                        stopFunc(resultReels);
                    }
                });

                return { spinning : true, resultText: null };
            } else {
                return null;
            }
        });
    }

    startReelSpin(index, reelTime) {
        const slotMachine = Slot.slotMachine;

        const startTime = Date.now()
        const timer = window.setInterval(() => {
            this.setState(prev => {
                const reel = prev.reels[index];
                let top = reel.top;
                top += (index + 1) * slotMachine.reelSpeedDifference;
                top += Date.now() < startTime + slotMachine.reelSpeed1Time + reelTime ? slotMachine.reelSpeed1Delta : slotMachine.reelSpeed2Delta;
                top > 0 && (top = 2 * -slotMachine.stripHeight);

                prev.reels[index] = { top, left: reel.left };

                return prev;
            });
            
            
        }, 20);
        return timer;
    }

    stopReelSpin(index, target) {
        const slotMachine = Slot.slotMachine;

        if (this.timers) {
            clearInterval(this.timers[index]);
        }

        const reels = this.state.reels;
        const reel = { left: reels[index].left } ;

        const e = slotMachine.stripHeight / numIconsPerReel;
        const top = -slotMachine.stripHeight - (target - 1) * e + slotMachine.alignmentOffset;
        reel.top = top;
        
        reels[index] = reel;
        this.setState({ reels });
    }

    endSpin() {
        this.setState({ spinning: false });
    }

    getStatus() {
        const { now } = this.state;
        const player = PlayerStore.getState();

        let statusText = null;
        if (player.spin < player.spinMax) {
            const remained = player.nextSpin - now;
            if (remained <= 0) {
                // 서버에 요청을 해야할 것 같다.
                statusText = `5 spins in soon`;
            } else {
                let min = Math.floor(remained/60000);
                let sec = Math.floor(remained/1000) % 60;

                if (min < 10) { min = "0" + min };
                if (sec < 10) { sec = "0" + sec };

                statusText = `5 spins in ${min}:${sec}`;
            }

        }  else if (player.spin > player.spinMax) {
            statusText = `+${player.spin - player.spinMax} spins`;
        } 

        return statusText;
    }

    render() {
        const { reels, spinning, resultText } = this.state;
        const player = PlayerStore.getState();
        
        return (
        <div id="base" className="center flex-v-center">
            <div id="result-text" className="flex-center">{resultText}</div>
            <div id="machine" className="flex-between">
                {
                    reels.map((reel, index) => {
                        return <Reel key={"reel-"+index } top={reel.top} />
                    })
                }
            </div>
            <div id="counter">
                <div
                    id="bar" 
                    style={{width: 100* player.spin / player.spinMax + "%"}} />
                <div id="number" className="flex-center">{ `${player.spin}/${player.spinMax}`}</div>
            </div>
            <div id="status">{ this.getStatus() } </div>
            <button id="spin-button" 
                disabled={spinning}
                onClick={this.spin.bind(this)}>SPIN</button>
        </div>);
    }
}

export default observer(Slot);