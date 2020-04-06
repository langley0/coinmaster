import React from "react";
import { observer } from "mobx-react";
import PlayerStore from "../stores/PlayerStore";

import Intro from "../_deprecated/intro";
import STAGE from "../_deprecated/data/stage";

import TownBuilding from "./TownBuilding";
import GameActions from "../actions/GameActions";
import PlayerActions from "../actions/PlayerActions";

const BUILDING_NAMES = ["HOUSE", "STATUE", "FIELD", "FARM", "BOAT"];


class VillageComponent extends React.Component {
    constructor(props)  {
        super(props);
        //this.onCloseIntro = this.onCloseIntro.bind(this);
    }

    /*onCloseIntro() {
        // intro 를 끝내고 서버에 태깅을 한다
        const { player } = this.props;
        player.intro();
    }*/

    build(buildingIndex) {
        const { player } = this.props;
        player.build(buildingIndex);
    }

    render() {
        const player = PlayerStore.getState();
        const currentStage = STAGE[player.stage];

        return (
        <div id="town" className="flex-v">
            <div id="playername" className="center flex-center">{
                player.name }
            </div>
            <button 
                id="to-slot" 
                className="center flex-center" 
                onClick={GameActions.goSlot}>▲SLOT
            </button>
            <div id="buildings" className="center">
                {
                    currentStage.map((prices, index) => {
                        const level = player.buildings[index];
                        const name = BUILDING_NAMES[index];
                        const price = prices[level];
                        return <TownBuilding 
                                key={"building-" + index} 
                                name={name} level={level} 
                                price={price} 
                                onClick={() => PlayerActions.build(index)} />
                    })
                }
            </div>
            { player.justCreated 
                ? <Intro onClose={this.onCloseIntro}/> 
                : null
            }
        </div>);
    }
}

export default observer(VillageComponent);