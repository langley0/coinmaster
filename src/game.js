import React from "react";
import styled from "styled-components";

import Menu from "./menu";
import Village from "./village";
import SlotMachine from "./slotmachine";

const GameView = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 375px;
    max-height: 812px;
    background-color: grey;
    overflow: hidden;
`;

const GameCanvas = styled.div`
    position: relative;
    width: 50%;
    height: 400%;
    top: ${props=> props.mode === "village" ? "-300%" : "0px"};
    transition: top 1s ease-in-out;
`;

export default class Game extends React.Component {
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

    render() {
        const { mode } = this.state;
        return (<GameView>
            <Menu>
                <GameCanvas mode={mode}>
                    <Village onChange={this.slot}/>
                    <SlotMachine onChange={this.village}/>
                </GameCanvas>
            </Menu>
        </GameView>);
    }
}