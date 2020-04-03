import alt from "../alt";
import PlayerActions from "../actions/PlayerActions";
import PlayerState from "../states/PlayerState";


class PlayerStore {
    constructor() {
        this.bindListeners({
            onLogin: PlayerActions.LOGIN
        });

        this.exportPublicMethods({
            getState: this.getState
        });

        this.state = new PlayerState();
    }

    fetch(data) {
        console.log("get player data");
    }

    getState() {
        // observable 데이터를 반환한다
        return this.state;
    }
}

export default alt.createStore(PlayerStore, "PlayerStore");