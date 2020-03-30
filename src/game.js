import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import UI from "./ui";
import Village from "./village";
import SlotMachine from "./slotmachine";

import Loader from "./loader";
import LoginComponent from "./login";

const GameView = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 375px;
    max-height: 812px;
    background-color: #555;
    overflow: hidden;
    user-select: none;
`;

const GameCanvas = styled.div`
    position: relative;
    width: 50%;
    height: 400%;
    top: ${props=> props.mode === "village" ? "-300%" : "0px"};
    transition: top 1s ease-in-out;
`;

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.slot = this.slot.bind(this);
        this.village = this.village.bind(this);

        this.state = {
            mode: "village"
        };
    }

    slot() {
        this.setState({mode: "slot" });
    }

    village() {
        this.setState({mode: "village" });
    }

    renderLogin()  {
        return <LoginComponent />;
    }

    renderGame() {
        const { mode } = this.state;
        return (
        <UI>
            <GameCanvas mode={mode}>
                <Village onChange={this.slot}/>
                <SlotMachine onChange={this.village}/>
            </GameCanvas>
        </UI>);
    }
    
    render() {
        const {player} = this.props;
        return (
        <GameView>{
                player.isLoaded ? this.renderGame() : this.renderLogin()
            }
            <Loader />
        </GameView>
        );
    }
}


export default inject("player")(observer(Game));