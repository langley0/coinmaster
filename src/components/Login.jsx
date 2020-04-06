import React from "react";
import AuthActions from "../actions/AuthActions";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);  
    }

    login() {
        const playerName = prompt("플레이어이름", "UNKOWN");
        if (playerName) {
            AuthActions.login(playerName);
        }
    }

    render() {
        return (
        <div className="flex-v f1 login">
            <div className ="flex-v f3">
                <div className="center">COIN<br/>FESTA</div>
            </div>
            <div className ="flex f1">
                <div className="button login-btn center" onClick={this.login}>LOGIN</div>
            </div>
        </div>);
    }
}

export default Login;