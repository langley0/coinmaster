import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Button from "./button";

const SlotStyle = styled.div`
    position: absolute;
    width: 100%;
    height: 25%;
    left: 0px;
    top: 00%;

`

const ChangeButton = styled.div`
    position: absolute;
    border: 2px #ddd solid;
    border-radius: 4px;

    width: 60%;
    bottom 12%;
    left: 20%;
    vertical-align: middle;
    font-size: 20px;
    line-height: 40px;
    text-align: center;

`

const SlotMachineContainer = styled.div`
    position: relative;
    width: 100%;
    height: 180px;
    border: 2px #ddd solid;
    border-radius: 4px;
    overflow: hidden;
`
const ReelStyle = styled.div`
    position: absolute;
    width:30%;
    height: 2160px;
    left: ${props=>props.index === 1 ? "35%" : props.index===2? "70%" : "0" };
    top: ${props=>props.top}px;
`

const ReelItem = styled.div`
    position: relative;
    font-size: 4rem;
    height: 90px;

    display: flex;
    align-items: center;
    justify-content: center;

`

const SlotBase = styled.div`
    position: absolute;
    left: 10%;
    top: 40%;
    width: 80%;
    height: 35%;
`


const SpinCounter = styled.div`
    position: relative;
    margin: auto;
    margin-top: 2px;
    width: 80%;
    height: 30px;

    border: 2px #ddd solid;
    border-radius: 10px;
    overflow: hidden;
`

const SpinCounterBar = styled.div`
    position: absolute;
    width: ${props=> Math.min(props.ratio * 100, 100)}%;
    height: 100%;
    background-color: #777;
`
const SpinNumber = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`



const SpinButton = styled(Button)`
    margin: auto;
    margin-top: 30px;

    font-size: 32px;
    width: 70%;
    height: 50px;
`

class Reel extends React.Component {
    render () {
        const { index, top } = this.props;
        return <ReelStyle index={index} top={top}>
            <ReelItem><span role="img" aria-label="Battery">🔋</span></ReelItem>
            <ReelItem><span role="img" aria-label="_">$</span></ReelItem>
            <ReelItem><span role="img" aria-label="Heavy Dollar Sign">💲</span></ReelItem>
            <ReelItem><span role="img" aria-label="Crossed Swords">⚔️</span></ReelItem>
            <ReelItem><span role="img" aria-label="Shield">🛡️</span></ReelItem>
            <ReelItem><span role="img" aria-label="Pig Face">🐷</span></ReelItem>
            <ReelItem><span role="img" aria-label="Battery">🔋</span></ReelItem>
            <ReelItem><span role="img" aria-label="_">$</span></ReelItem>
            <ReelItem><span role="img" aria-label="Heavy Dollar Sign">💲</span></ReelItem>
            <ReelItem><span role="img" aria-label="Crossed Swords">⚔️</span></ReelItem>
            <ReelItem><span role="img" aria-label="Shield">🛡️</span></ReelItem>
            <ReelItem><span role="img" aria-label="Pig Face">🐷</span></ReelItem>
            <ReelItem><span role="img" aria-label="Battery">🔋</span></ReelItem>
            <ReelItem><span role="img" aria-label="_">$</span></ReelItem>
            <ReelItem><span role="img" aria-label="Heavy Dollar Sign">💲</span></ReelItem>
            <ReelItem><span role="img" aria-label="Crossed Swords">⚔️</span></ReelItem>
            <ReelItem><span role="img" aria-label="Shield">🛡️</span></ReelItem>
            <ReelItem><span role="img" aria-label="Pig Face">🐷</span></ReelItem>
            
        </ReelStyle>
    }
}

const numIconsPerReel = 6;
const singleHeight = 90;


class Slot extends React.Component {
    static slotMachine = {
        stripHeight: singleHeight * numIconsPerReel,
        alignmentOffset: singleHeight/2,
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
        const slotMachine = Slot.slotMachine;
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
                
                // 스핀 요청을 한다
                // TODO : 결과를 얻어오고 그 결과에 맞추어서 룰렛을 멈출수 있어야 한다
                this.props.player.spinReel();

                return { spinning : true };
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

    stopReelSpin(index) {
        const slotMachine = Slot.slotMachine;

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
        const { player } = this.props;
        
        return (
        <SlotBase>
            <SlotMachineContainer>
                {
                    reels.map((reel, index) => {
                        return <Reel index={index} top={reel.top} />
                    })
                }
            </SlotMachineContainer>
            <SpinCounter>
                <SpinCounterBar ratio={player.spin/player.spinMax} />
            <SpinNumber>{ `${player.spin}/${player.spinMax}`}</SpinNumber>
            </SpinCounter>
            <SpinButton disabled={spinning} onClick={this.spin.bind(this)}>SPIN</SpinButton>
        </SlotBase>);
    }
}

Slot = inject("player")(observer(Slot));

export default class SlotMachine extends React.Component {
    constructor(props)  {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { onChange } = this.props;
        if (onChange) {
            onChange();
        }
    }

    render() {
        return (
        <SlotStyle>
            <Slot />
            <ChangeButton onClick={this.onClick}>▼Go Village</ChangeButton>
        </SlotStyle>);
    }
}