import alt from "../alt";
import { decorate, action } from "mobx";
import PlayerActions from "../actions/PlayerActions";
import PlayerState from "../states/PlayerState";


class PlayerStore {
    constructor() {
        this.bindListeners({
            onFetchSuccessed: PlayerActions.FETCH_SUCCESSED,
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
    }

    
    getState() {
        return this.state;
    }
}

decorate(PlayerStore, {
    onFetchSuccessed: action,
});

export default alt.createStore(PlayerStore, "PlayerStore");