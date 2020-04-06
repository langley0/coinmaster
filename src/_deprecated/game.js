import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import UI from "./ui";
import Village from "./village";
import SlotMachine from "./slotmachine";

import Login from "./login";
import Attack from "./attack";
import Raid from "./raid";
import Loader from "./loader";

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
        return <Login />;
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

    renderContent() {
        const {env, player} = this.props;
        if(env.mode === "login") {
            return this.renderLogin();
        } else if(env.mode === "game") {
            return this.renderGame();
        } else if(env.mode === "raid") {
            return <Raid></Raid>
        } else if(env.mode === "attack") {
            return <Attack></Attack>
        } else {
            // 처음 실행이다
            // 나중에 로그인을 관리하는 부분을 따로 분리하여야 한다. 일단은 여기서 작성
            // 로그인 가능한 상태인지 파악한다
            // auth 매니져가 따로 있어야 한다
            const username = localStorage.getItem("username");
            if (username) {
                // 바로 계정을 읽어와서 게임을 시도한다
                env.showLoader();
                player.load(username).then(() => {
                    env.toHome();
                    env.hideLoader();
                });
                return null;
            } else {
                // 로그인시도
                Promise.resolve().then(()=> {
                    env.toLogin();
                });
                return null;
            }
        }
        
    }
    
    render() {
        
        return (
        <GameView>
            { this.renderContent() }
            <Loader />
        </GameView>
        );
    }
}


export default inject("player", "env")(observer(Game));