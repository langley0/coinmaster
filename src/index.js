import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import "./css/main.css";
import Game from "./game";
import Environment from "./store/env";
import Player from "./store/player";

const env = new Environment();
const player = new Player();

ReactDOM.render(
    <Provider env={env} player={player}>
        <Game />
    </Provider>, 
    document.getElementById("root"));