import React from "react";
import { observer } from "mobx-react";
import AttackSummary from "./AttackSummary";
import GameActions from "../actions/GameActions";
import PlayerActions from "../actions/PlayerActions";

const BUILDGINS = [
    "HOUSE",
    "STATUE",
    "FIELD",
    "FARM",
    "BOAT",
];

class Attack extends React.Component {
    constructor(props) {
        super(props);

        this.onAttack = this.onAttack.bind(this);
        this.backToGame = this.backToGame.bind(this);

        this.state = {
            stolen: 0,
            finished: false,
            confirm: false,
        }
    }

    backToGame() {
        // 다시 슬롯으로 돌아간다
        GameActions.goSlot();
    }

    onAttack(index) {
        return () => {
            PlayerActions.attack(() => {
                this.setState({ confirm: true });
            });
        }
    }

    renderSummary() {
        const { confirm } = this.state;
        if (confirm) {
            const summaryText = "You attacked Arturas's village and won 1,650,000";
            return <AttackSummary text={summaryText} onClick={this.backToGame}/> 
        } else {
            return null;
        }
    }

    render() {
        
        return (
        <div id="attackmode" className="flex-v">
            <div id="title" className="flex-center">Amanada's village</div>
            <div id="target-container" className="flex-v center">
            {
                BUILDGINS.map(building => (<div key={"attack-target-"+building} id="target" className="flex-center">
                    <div id="left">{building}</div>
                    <button id="right" onClick={this.onAttack(building)}>ATTACK</button>
                </div>))
            }
            </div>
            { this.renderSummary() }
        </div>);
    }
}

export default observer(Attack);