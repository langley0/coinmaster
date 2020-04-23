import alt from "../alt"
import GameActions from "./GameActions";
import repository from "../_deprecated/core/gamerepository";

class PlayerActions {
    constructor() {
        this.generateActions(
            "fetchSuccessed",
            "fetchFailed",
            "attackFinished",
            "raidSuccessed",
            "buildSuccessed",
        );
    }
    
    fetch(playerId) {
        return  async ()=> {
            GameActions.showSpinner();
            const player = await repository.login(playerId);
            this.fetchSuccessed(player);
            GameActions.hideSpinner();
        };
    }

    build(buildingIndex) {
        return async() => {
            GameActions.showSpinner();
            const result = await repository.build(buildingIndex);
            if (result) {
                this.buildSuccessed(result);
            }
            GameActions.hideSpinner();
        };
    }

    spin(callback) {
        return async() => {
            const result = await repository.spin();
            const player = await repository.sync();
            this.fetchSuccessed(player);
            const convertedReels = [result.reel[0] + 1, result.reel[1] + 1, result.reel[2] + 1];
            return {
                reels: convertedReels,
                reward: result.reward,
            };
        };
    }

    attack(callback) {
        return async () => {
            GameActions.showSpinner();
            const result = await repository.attack();
            this.attackFinished(result);
            callback(result);
            GameActions.hideSpinner();
        };
    }

    raid(callback) {
        return async () => {
            GameActions.showSpinner();
            const result = await repository.raid();
            this.raidSuccessed(result);
            callback(result);
            GameActions.hideSpinner();
        };
    }
}


export default alt.createActions(PlayerActions);
