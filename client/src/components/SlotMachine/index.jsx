import React from "react";
import Slot from "./Slot";
import GameActions from "../../actions/GameActions";

export default class SlotMachine extends React.Component {

    render() {
        return (
        <div id="slotmode" className="flex-v">
            <Slot />
            <button id="go-town" 
                className="center" 
                onClick={() => GameActions.goTown() }>▼TOWN</button>
        </div>);
    }
}