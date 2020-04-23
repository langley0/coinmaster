import React from "react";
import { observer } from "mobx-react";

import GameStore from "../stores/GameStore";
import AuthActions from "../actions/AuthActions";

import GameMain from "./GameMain";
import Login from "./Login";
import Spinner from "./Spinner";
import Hyperdrive from "./Hyperdrive";

class GameApp extends React.Component {
    componentDidMount() {
        AuthActions.initialize();
    }

    render() {
        const gameState = GameStore.getState();
        return  (
            <div className="game-app flex center"> 
                { gameState.authenticated ? <GameMain/> : <Login/> }
                <Spinner />
                <Hyperdrive count={100}/>
            </div>
        );
    }
}

export default observer(GameApp);