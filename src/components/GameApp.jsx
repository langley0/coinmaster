import React from "react";
import { observer } from "mobx-react";

import GameStore from "../stores/GameStore";
import AuthActions from "../actions/AuthActions";

import GameMain from "./GameMain";
import Login from "./Login";
import Spinner from "./Spinner";

class GameApp extends React.Component {
    componentDidMount() {
        AuthActions.initialize();
    }

    render() {
        const gameState = GameStore.getState();
        return  <div className="flex center full game-app"> 
                    { gameState.authenticated ? <GameMain/> : <Login/> }
                    <Spinner />
                </div>
    }
}

export default observer(GameApp);