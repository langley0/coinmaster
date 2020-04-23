import alt from "../alt";
import { decorate, action } from "mobx";
import PlayerActions from "../actions/PlayerActions";
import PlayerState from "../states/PlayerState";


class PlayerStore {
    constructor() {
        this.bindListeners({
            onFetchSuccessed: PlayerActions.FETCH_SUCCESSED,
            handleAttackFinished: PlayerActions.ATTACK_FINISHED,
            handleBuildSuccessed: PlayerActions.BUILD_SUCCESSED,
        });

        this.exportPublicMethods({
            getState: this.getState
        });

        this.state = new PlayerState();
    }

    onFetchSuccessed(data) {
        this.state.name = data.name;
        this.state.gold = data.gold;
        this.state.spin = data.spin;
        this.state.nextSpin = data.nextSpin;
        this.state.stage = data.stage;
        this.state.buildings = data.buildings;
    }

    handleAttackFinished(result) {
        // total 로 맞춘다
        this.state.gold = result.total;
    }

    handleBuildSuccessed(result) {
        this.state.gold = result.gold;
        this.state.buildings = result.buildings;
        this.state.star = result.star;
    }

    
    getState() {
        return this.state;
    }
}

decorate(PlayerStore, {
    onFetchSuccessed: action,
    handleAttackFinished: action,
});

export default alt.createStore(PlayerStore, "PlayerStore");