import React from "react";
import { Provider } from "mobx-react";

import PlayerStore from "../stores/PlayerStore";
import GameStore from "../stores/GameStore";

import Login from "./Login";

export default class GameApp extends React.Component {
    render() {
        const playerState = PlayerStore.getState();
        const gameState = GameStore.getState();

        return  <Provider player={ playerState } game={ gameState }>
                    <div className="flex center full game-app"> {
                        gameState.auth ? <div/> : <Login/>
                    }
                    </div>
                </Provider>
    }
}