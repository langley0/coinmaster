import React from "react";
import { observer } from "mobx-react";
import PlayerStore from "../stores/PlayerStore";
import STAGE from "../_deprecated/data/stage";

import TownBuilding from "./TownBuilding";
import GameActions from "../actions/GameActions";
import PlayerActions from "../actions/PlayerActions";

const BUILDING_NAMES = ["HOUSE", "STATUE", "FIELD", "FARM", "BOAT"];


class VillageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buildingMenuShown: false
        };

        this.toggleBuildMenu = this.toggleBuildMenu.bind(this);
    }

    build(buildingIndex) {
        PlayerActions.build(buildingIndex);
    }

    toggleBuildMenu() {
        const { buildingMenuShown} = this.state;
        this.setState({ buildingMenuShown: !buildingMenuShown });
    }

    onClickBuild(index) {
        return (event) => {
            event.stopPropagation();
            PlayerActions.build(index)
        }
    }

    _renderBuildMenu() {
        const player = PlayerStore.getState();
        const currentStage = STAGE[player.stage];

        return (
        <div className="modal" 
            onClick={this.toggleBuildMenu}>
            <div id="buildings" className="center"> {
                currentStage.map((prices, index) => {
                    const level = player.buildings[index];
                    const name = BUILDING_NAMES[index];
                    const price = prices[level];
                    return <TownBuilding 
                            key={"building-" + index} 
                            name={name} level={level} 
                            price={price} 
                            onClick={this.onClickBuild(index)} />
                })}
            </div>
        </div>);
    }

    render() {
        const { buildingMenuShown} = this.state;
        const player = PlayerStore.getState();

        return (
        <div id="town" className="flex-v">
            <div id="playername" className="center flex-center">{
                player.name }
            </div>
            <button 
                id="to-slot" 
                className ="center"
                onClick={()=> GameActions.goSlot()}>▲SLOT
            </button>
            <button 
                id="build-button"
                onClick={this.toggleBuildMenu}>
                BUILD
            </button> 
            { buildingMenuShown 
            ? this._renderBuildMenu() 
            : null }
        </div>);
    }
}

export default observer(VillageComponent);