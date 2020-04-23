import React from "react";
import ReactDOM from "react-dom";

import "./css/main.css";

/*import Game from "./game";
import Environment from "./store/env";
import Player from "./store/player";
import { Provider } from "mobx-react";

const env = new Environment();
const player = new Player();*/

import GameApp from "./components/GameApp";

ReactDOM.render(
    <GameApp />,
    document.getElementById("root"));