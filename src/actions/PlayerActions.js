import alt from "../alt"
import GameActions from "./GameActions";
import repository from "../_deprecated/core/gamerepository";

class PlayerActions {
    constructor() {
        this.generateActions(
            "fetchSuccessed",
            "fetchFailed",
        );
    }
    
    fetch(playerId) {
        return  async ()=> {
            GameActions.showSpinner();
            const player = await repository.login(playerId);
            this.fetchSuccessed(player);
            GameActions.hideSpinner();
        }
    }

    build() {
        return async() => {
            GameActions.showSpinner();
            alert("준비중");
            GameActions.hideSpinner();
        };
    }

    spin(callback) {
        return async() => {
            const result = await repository.spin();
            const player = await repository.sync();
            this.fetchSuccessed(player);
            callback({
                reels: result,
                reward: { gold: 2000 },
            });
        }
    }
}


export default alt.createActions(PlayerActions);
