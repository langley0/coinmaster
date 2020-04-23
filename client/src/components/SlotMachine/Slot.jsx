import React from "react";
import { observer } from "mobx-react";
import PlayerStore from "../../stores/PlayerStore";
import SlotStore from "../../stores/SlotStore";
import SlotActions from "../../actions/SlotActions";

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
        clearInterval(this.timeUpdator);
    }

    spin2()  {
        SlotActions.startSpin();
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
        const player = PlayerStore.getState();
        const slot = SlotStore.getState();

        return (
        <div id="base" className="center flex-v-center">
            <div id="result-text" className="flex-center">{slot.resultText}</div>
            <div id="machine" className="flex-between">
                {
                    slot.reels.map((reel, index) => {
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
                disabled={slot.spinning}
                onClick={this.spin2.bind(this)}>SPIN</button>
        </div>);
    }
}

export default observer(Slot);