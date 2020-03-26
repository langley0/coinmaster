import React from "react";
import ReactDOM from "react-dom";

import "./main.css";
import Game from "./game";
/*

import bg  from "./reel_strip.png";
import ov  from "./reel_overlay.png";
import frame  from "./frame.png";

const styles = {
    slotMachineContainer: {
        position: "absolute",
        width: 464,
        height: 415,
        top: 150,
    },
    button: {
        top: 347,
        width: 355,
        height: 65,
        position: "absolute",
    },
    overlay: {
        position: "absolute",
        zIndex: 100,
        width: "100%",
        height: "100%",
        background: `transparent url(${ov}) 0 center no-repeat`,
    },
    frame: {
        position: "absolute",
        width: 530,
        height: 386,
        left: -33,
        top: 78,

        background: `transparent url(${frame}) 0 center no-repeat`,
    }
}

const slotMachine = {
    stripHeight: 720,
    alignmentOffset: 86,
    firstReelStopTime: 667,
    secondReelStopTime: 575,
    thirdReelStopTime: 568,
    payoutStopTime: 700,
    reelSpeedDifference: 0,
    reelSpeed1Delta: 100,
    reelSpeed1Time: 0,
    reelSpeed2Delta: 100,
    positioningTime: 200,
    bounceHeight: 200,
    bounceTime: 1e3,
    winningsFormatPrefix: "",
};

const numIconsPerReel = 6;

class SlotEffect extends React.Component {
    constructor(){
        super();
        
        this.state = {
            reels: [{ top: 0, left: 10 }, { top: 0, left: 158, }, { top: 0, left: 304, }],
            spinning: false
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    spin() {
        this.setState(prev => {
            if(!prev.spinning) {
                const timer1 = this.startReelSpin(0, 0);
                const timer2 = this.startReelSpin(1, slotMachine.secondReelStopTime);
                const timer3 = this.startReelSpin(2, slotMachine.secondReelStopTime + slotMachine.thirdReelStopTime);

                this.timers = [timer1, timer2, timer3];
                
                
                setTimeout(() => {
                    let timeAfter = 0;
                    setTimeout(() =>{
                        this.stopReelSpin(0);
                    }, timeAfter);
                    timeAfter += slotMachine.secondReelStopTime;
                    window.setTimeout(() => {
                        this.stopReelSpin(1);
                    }, timeAfter);
                    timeAfter += slotMachine.thirdReelStopTime;
                    window.setTimeout(() => {
                        this.stopReelSpin(2);
                    }, timeAfter);
                    timeAfter += slotMachine.payoutStopTime;
                    window.setTimeout(() => {
                        this.endSpin();
                    }, timeAfter);

                }, slotMachine.firstReelStopTime);


                return { spinning : true };
            } else {
                return null;
            }
        });
    }

    startReelSpin(index, reelTime) {
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

    stopReelSpin(index) {
        if (this.timers) {
            clearInterval(this.timers[index]);
        }

        const reels = this.state.reels;
        const reel = { left: reels[index].left } ;
        const target = Math.floor(Math.random() * numIconsPerReel);

        const e = slotMachine.stripHeight / numIconsPerReel;
        const top = -slotMachine.stripHeight - (target - 1) * e + slotMachine.alignmentOffset;
        reel.top = top;
        
        reels[index] = reel;
        this.setState({ reels });
    }

    endSpin() {
        this.setState({ spinning: false });
    }

    render() {
        const { reels, spinning } = this.state;
        const reelStyle = {width: 121, height: 2160, position:"absolute", background: `url(${bg}) 0 0 repeat-y`};
        return (
        <div style={{width: 464, height: 800, position:"relative", margin: "auto"}}>
            <div style={styles.frame}></div>
            <div style={styles.slotMachineContainer}>
                <div style={{position: "absolute", left:12, width: 435, height:283, overflow:"hidden"}}>
                    {
                        reels.map((reel) => {
                            let style = Object.assign({}, reelStyle);
                            style = Object.assign(style, reel);
                            return <div style={style}></div>;
                        })
                    }
                    <div style={styles.overlay}></div>
                </div>
                <button style={styles.button} onClick={this.spin.bind(this)} disabled={spinning}>SPIN</button>
            </div>
        </div>);
    }
}
*/

ReactDOM.render(<Game/ >, document.getElementById("root"));