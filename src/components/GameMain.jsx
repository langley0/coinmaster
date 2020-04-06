import React from "react";
import { observer } from "mobx-react";

import PlayerStore from "../stores/PlayerStore";
import GameStore from "../stores/GameStore";
import AnimatedNumber from "./animated-number"
import Home from "./Home";
import Attack from "./Attack";
import Raid from "./Raid";

import { formatInt } from "../utils";

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

    renderContent() {
        const state = GameStore.getState();
        
        if(state.mode === "town") {
            return <Home mode="town"/>;
        } else if(state.mode === "slotmachine") {
            return <Home mode="slotmachine"/>;
        } else if(state.mode === "raid") {
            return <Raid />;
        } else if(state.mode === "attack") {
            return <Attack />;
        } 
    }

    render() {
        const { menuOpened } = this.state;
        const player = PlayerStore.getState();
        
        return (
        <div className={`uibase ${menuOpened ? "menuon" : "menuoff"}`}>
            {  this.renderContent() }
            <div id="header">
                <div id="gold">
                    <AnimatedNumber value={player.gold} duration={500} format={formatInt}/>
                </div>
                <div id="star">
                    <div id="starsign">★</div>
                    <div id="counter">{player.star}</div>
                </div>
                <div id="shield">
                    <div className="empty"></div>
                    <div className="empty overlap"></div>
                    <div className="empty overlap"></div>
                </div>
            </div>
            <div id="menu">
                <div id="title">MENU</div>
                <div id="itemcontainer" className="flex-v">
                    {
                        menulist.map(item => <div className="item" key={"menu-"+item}>{item}</div>)
                    }
                </div>
                <button id="menubutton" onClick={this.onClickMenu}>MENU</button>
            </div>
        </div>);
    }
}

export default observer(GameMain);