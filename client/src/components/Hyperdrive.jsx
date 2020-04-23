import React from "react";
import { observer } from "mobx-react";
import "../css/hyperdrive.css";
import GameStore from "../stores/GameStore";
/*
import GameActions from "../actions/GameActions";

setInterval(function() {
    const game = GameStore.getState();
    if (game.hyperdrive === "on") {
        GameActions.hyperdriveOff();
    } else {
        GameActions.hyperdriveOn();
    }
}, 3000);
*/
let stars = {};
function randomStar(index) {
    if (!stars[index])  {
        stars[index] = {
            degree: Math.floor(Math.random() * 360),
            delay: (Math.random() * 3).toFixed(3),
        };
    }

    const { degree, delay } = stars[index];

    return (
        <div key={`star-`+index} className="star" style={{ transform: `rotateZ(${degree}deg)`}}>
            <div className="star-point" style={{animationDelay: `${delay}s`}}></div>
        </div>
    );
}

function Hyperdrive({ count=10 }) {
    const game = GameStore.getState();
    return (
        <div className={"universe " + game.hyperdrive}>
            {Array(count).fill().map((v,i) => randomStar(i))}
        </div>
    )
}


export default observer(Hyperdrive);