import React from "react";
import { observer } from "mobx-react";
import GameStore from "../stores/GameStore";

class Spinner extends React.PureComponent {
    render() {
        const state = GameStore.getState();
        if (state.spinner > 0) {
            return (
            <div className="flex spinner">
                <div className="center">
                    <div className="dot1"/>
                    <div className="dot2"/>
                    <div className="dot3"/>
                </div>
            </div>
            )
        } else {
            return null;
        }
    }
}

export default observer(Spinner);