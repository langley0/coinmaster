import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Button from "./button";

const LoginView = styled.div`
    width: 100%;
    height: 100%;
`;

const Title = styled.div`
    position: relative;
    width: 80%;
    left: 10%;
    top: 20%;
    font-size:  64px;
    text-align: center;
`

const LoginButton = styled(Button)`
    position: absolute;
    width: 80%;
    height : 48px;

    top: 70%;
    left: 10%;
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
                env.hideLoader();
            });
        }
    }

    render() {
        return (
        <LoginView>
            <Title>COIN</Title>
            <Title>FESTA</Title>
            <LoginButton onClick={this.tryLogin}>LOGIN</LoginButton>
        </LoginView>);
    }
}

export default inject("player", "env")(observer(LoginComponent));