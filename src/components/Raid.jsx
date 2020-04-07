import React from "react";
import { observer } from "mobx-react";

import { formatInt }  from "../utils";
import AnimatedNumber from "./AnimatedNumber";
import GameActinos from "../actions/GameActions";
import PlayerActions from "../actions/PlayerActions";

class Raid extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.backToGame = this.backToGame.bind(this);

        this.state = {
            target: [false, false, false, false],
            stolen: 0,
            finished: false,
        }
    }

    onClick(index) {
        return () => {
            PlayerActions.raid((result) => {
                this.setState(prev => {
                    let { target, stolen } = prev;
                    target[index] = true;
                    // 요청을 한다
                    stolen += result.gained;
                    const finished = result.finished;
                    return { target, stolen, finished };
                });
            });
        };
    }

    finish() {
        this.setState({ confirm: true });
    }

    backToGame() {
        GameActinos.goSlot();
    }

    renderFinishModal() {
        return (
        <div className="modal">
            <div id="summary" className="flex-center">
                <div id="left">You sotle 1,1165,000 coins from David</div>
                <div id="right" className="flex-center">
                    <button id="ok" onClick={this.backToGame}> OK </button>
                </div>
            </div>
        </div>);
    }

    render() {
        const { target, stolen, finished } = this.state;

        return (
        <div id="raidmode" className="flex-v">
            <div id="title">
                Coin Master<br/>David's Treasure<br/>1,398,000
            </div>
            <div id="stolen"> 
                {"You stole : "}
                <AnimatedNumber value={stolen} duration={500} format={formatInt}/>
            </div>
            <div id="target-container" className="flex-around flex-wrap">
                <button id="target" disabled={target[0]} onClick={this.onClick(0)}/>
                <button id="target" disabled={target[1]} onClick={this.onClick(1)}/>
            </div>
            <div id="target-container" className="flex-around flex-wrap">
                <button id="target" disabled={target[2]} onClick={this.onClick(2)}/>
                <button id="target" disabled={target[3]} onClick={this.onClick(3)}/>
            </div> {
            finished
            ? this.renderFinishModal()
            : null }
        </div>);
    }
}

export default observer(Raid);