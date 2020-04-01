import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

import Button from "./button";
import { format }  from "./utils";
import Modal from "./components/modal"
import AnimatedNumber from "./components/animated-number"


const formatInt = function (v) {
    return format(Math.floor(v));
}

const RaidView = styled.div`
    width: 100%;
    height: 100%;
`

const RaidTitle = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 2px solid #ddd;
    z-index: 2;
    padding: 10px;
`

const Stolen = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 50%;
    height: 40px;
    border: 2px solid #ddd;
    padding-left: 10px;
    margin: -2px auto;
`

const RaidBox  = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    width: 90%;
    margin: 40% auto;
`

const RaidButton = styled(Button)`
    width: 120px;
    height: 120px;
    margin: 10px;
    color: ${props => props.disabled ? "#777" : "white" };
    
    &:before {
        content: "X";
    }
`

const finishSlide = keyframes`
    0% { top: 100% }
    100% { top: 0; }
`

const FinishView = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    
    width: 90%;
    height : 100px;

    background-color: #555;
    
    border: 2px solid #ddd;
    border-radius: 10px;

    animation: ${finishSlide} 1s 1;

`;

FinishView.Left = styled.div`
    float: left;
    width: 80%;
    font-size: 20px;
    padding: 10px;

`;

FinishView.Right = styled.div`
    float: right;
    width: 20%;
    height: 40px;
    padding: 10px;
`;

FinishView.Button = styled(Button)`
    width: 100%;
    height: 100%;
`


class Raid extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.backToGame = this.backToGame.bind(this);

        this.state = {
            target: [false, false, false, false],
            stolen: 0,
            finished: false,
            confirm: false,
        }
    }

    onClick(index) {
        return () => {
            this.setState(prev => {
                let { target, stolen, finished } = prev;
                if (!finished && !target[index]) {
                    // 처리한다
                    target[index] = true;
                    stolen += 10000;

                    const count = target.reduce((t, v) => v ? t+1: t, 0);
                    if (count >= 3) {
                        finished = true;
                        // 1초후에 모달을 띄운다
                        setTimeout(this.finish.bind(this), 1000);
                    }

                    return { target, stolen, finished };
                } else {
                    return null;
                }
            });
        }
    }

    finish() {
        this.setState({ confirm: true });
    }

    backToGame() {
        const { env } = this.props;
        env.toHome();
    }

    render() {
        const { target, stolen, confirm } = this.state;

        return (
        <RaidView>
            <RaidTitle>
                Coin Master<br/>David's Treasure<br/>1,398,000
            </RaidTitle>
            <Stolen>You stole:<AnimatedNumber value={stolen} duration={500} format={formatInt}/></Stolen>
            <RaidBox>
                <RaidButton disabled={target[0]} onClick={this.onClick(0)}/>
                <RaidButton disabled={target[1]} onClick={this.onClick(1)}/>
                <RaidButton disabled={target[2]} onClick={this.onClick(2)}/>
                <RaidButton disabled={target[3]} onClick={this.onClick(3)}/>
            </RaidBox>
            {
                confirm ? <Modal>
                    <FinishView>
                        <FinishView.Left>You sotle 1,1165,000 coins from David</FinishView.Left>
                        <FinishView.Right>
                            <FinishView.Button onClick={this.backToGame}> OK </FinishView.Button>
                        </FinishView.Right>
                    </FinishView>
                </Modal> :
                null
            }
        </RaidView>);
    }
}

export default inject("player", "env")(observer(Raid));