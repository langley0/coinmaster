import React from "react";
import { inject, observer } from "mobx-react";

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
        <div className="flex-v f1 login">
            <div className ="flex-v f3">
                <div className="center">COIN<br/>FESTA</div>
            </div>
            <div className ="flex f1">
                <div className="button login-btn center" onClick={this.tryLogin}>LOGIN</div>
            </div>
        </div>);
    }
}

export default inject("player", "game")(observer(LoginComponent));