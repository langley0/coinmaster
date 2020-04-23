import React from "react";
import AuthActions from "../actions/AuthActions";

function Login() {
    const onClick = function () {
        const playerName = prompt("플레이어이름", "UNKOWN");
        if (playerName) {
            AuthActions.login(playerName);
        }
    }

    return (
        <div className="flex-v login">
            <div className ="flex f3">
                <div className="center text-center">
                    COIN
                    <br/>
                    FESTA
                </div>
            </div>
            <div className ="flex f1">
                <button 
                    className="login-btn center" 
                    onClick={onClick}
                >
                    LOGIN
                </button>
            </div>
        </div>
    );
}

export default Login;