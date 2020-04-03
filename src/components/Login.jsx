import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Button from "../button";

const LoginButton = styled(Button)`
    width: 80%;
    height : 48px;
`;


class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.tryLogin = this.tryLogin.bind(this);
    }

    tryLogin() {
        const { player, env } = this.props;
        const playerName = prompt("플레이어이름", "UNKOWN");
        if (playerName) {
            env.showLoader();
            player.load(playerName).then(() => {
                localStorage.setItem("username", playerName);
                
                env.toHome();
                env.hideLoader();
            });
        }
    }

    render() {
        return (
        <div className="flex login column">
            <div className ="flex-3 title column">
                <div className="center">COIN<br/>FESTA</div>
            </div>
            <div className ="flex action">
            <LoginButton className="center" onClick={this.tryLogin}>LOGIN</LoginButton>
            </div>
        </div>);
    }
}

export default inject("player", "game")(observer(LoginComponent));