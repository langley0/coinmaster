import React from "react";
import styled from "styled-components";

import Menu from "./menu";

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
    width: 200%;
    height: 200%;
    top: -100%;
`;

export default class Game extends React.Component {
    render() {
        return (<GameView>
            <GameCanvas>

            </GameCanvas>
            <Menu />
        </GameView>);
    }
}