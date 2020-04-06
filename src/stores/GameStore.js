import alt from "../alt";
import GameState from "../states/GameState";
import GameActions from "../actions/GameActions";


class GameStore {
    constructor() {
        this.bindListeners({
            spinnerOn: GameActions.SHOW_SPINNER,
            spinnerOff: GameActions.HIDE_SPINNER,
            handleLoginSuccessed: GameActions.LOGIN_SUCCESSED,
            handleGoTown: GameActions.GO_TOWN,
            handleGoSlot: GameActions.GO_SLOT,
            handleGoAttack: GameActions.GO_ATTACK,
            handleGoRaid: GameActions.GO_RAID,
        });

        this.exportPublicMethods({
            getState: this.getState
        });

        // default state 에 대해서 어떻게 할지 고민해보자
        this.state = new GameState();
    }

    getState() {
        // observable 데이터를 반환한다
        return this.state;
    }

    spinnerOn() {
        this.state.spinner += 1;
    }

    spinnerOff() {
        this.state.spinner -= 1;
    }

    handleLoginSuccessed() {
        this.state.authenticated = true;
    }

    handleGoTown() {
        this.state.mode = "town";
    }

    handleGoSlot() {
        this.state.mode = "slotmachine";
    }

    handleGoAttack() {
        this.state.mode = "attack";
    }

    handleGoRaid() {
        this.state.mode = "raid";
    }
}

export default alt.createStore(GameStore, "GameStore");