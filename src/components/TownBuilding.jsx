import React from "react";
import { format } from "../utils";

export default class TownBuilding extends React.Component {
    getProgress(level) {
        if (level === 0) {
            return "○-○-○-○";
        } else if (level === 1) {
            return "●-○-○-○";
        } else if (level === 2) {
            return "●─●─○─○";
        } else if (level === 3) {
            return "●─●─●─○";
        } else {
            return "●─●─●─●";
        }
    }

    render() {
        const { name, level, price,onClick} = this.props;
        return (
        <div className="building flex">
            <div className="f3 flex-v-center">
                <div className="text-center">{ name }</div>
                <div className="text-center">{ this.getProgress(level) }</div>
            </div>
            <div className="f1 flex-v-center">
                <div className="text-center">{format(price)}</div>
                <button className="upgrade" onClick={onClick}>BUY</button>
            </div>
        </div>

        );
    }
}