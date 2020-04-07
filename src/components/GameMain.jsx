import React from "react";
import { observer } from "mobx-react";

import PlayerStore from "../stores/PlayerStore";
import GameStore from "../stores/GameStore";
import AnimatedNumber from "./AnimatedNumber"
import Home from "./Home";
import Attack from "./Attack";
import Raid from "./Raid";
import Welcome from "./Welcome";

import { formatInt } from "../utils";
import GameActions from "../actions/GameActions";

const menulist = [
    "PLAY",
    "VILLAGE",
    "BUY COINS/SPINS",
    "VILLAGE SHOP",
    "VILLAGE NEWS",
    "GIFT",
    "CARD COLLECTION",
    "MAP",
    "LEADERBOARD",
    "INVITE FRIENDS",
    "ACHIEVEMENTS",
    "SETTINGS",
];


class GameMain extends React.Component {
    constructor() {
        super();

        this.state = { menuOpened: false}

        this.onClickMenu = this.onClickMenu.bind(this);
    }

    onClickMenu() {
        this.setState(prev => {
            return { menuOpened: !prev.menuOpened };
        })
    }

    _renderEventPopup() {
        const game = GameStore.getState();
        if (!game.introWatched) {
            return <Welcome onClose={() => GameActions.watchIntro()}/>;
        }
    }

    render() {
        const { menuOpened } = this.state;
        const player = PlayerStore.getState();
        const game = GameStore.getState();

        return (
        <>
            <div className={`uibase ${menuOpened ? "menuon" : "menuoff"}`}>{  
                game.mode === "town" 
                ? <Home mode="town"/> 
                : <Home mode="slotmachine"/> } 
                <div id="header">
                    <div id="gold">
                        <AnimatedNumber value={player.gold} duration={500} format={formatInt}/>
                    </div>
                    <div id="star">
                        <div id="starsign">★</div>
                        <div id="counter">{player.star}</div>
                    </div>
                    <div id="shield">
                        <div className={ player.shield > 0 ? "filled" : "empty" }></div>
                        <div className={ player.shield > 1 ? "filled" : "empty" }></div>
                        <div className={ player.shield > 2 ? "filled" : "empty" }></div>
                    </div>
                </div>
                <div id="menu">
                    <div id="title">MENU</div>
                    <div id="itemcontainer" className="flex-v"> {
                        menulist.map(item => <div className="item" key={"menu-"+item}>{item}</div>) }
                    </div>
                    <button id="menubutton" onClick={this.onClickMenu}>MENU</button>
                </div>
            </div> 
            { game.mode === "attack"
            ? <Attack />
            :  game.mode === "raid" 
            ? <Raid />
            : null } 
            { this._renderEventPopup() }
        </>);
    }
}

export default observer(GameMain);