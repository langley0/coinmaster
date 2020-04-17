import alt from "../alt";
import GameState from "../states/GameState";
import GameActions from "../actions/GameActions";
import { action, decorate } from "mobx";


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
            handleWatchIntro: GameActions.WATCH_INTRO,
            handleHyperdriveOn: GameActions.HYPERDRIVE_ON,
            handleHyperdriveOff: GameActions.HYPERDRIVE_OFF,
            handleChangeMode: GameActions.CHANGE_MODE,
        });

        this.exportPublicMethods({
            getState: this.getState
        });

        // default state 에 대해서 어떻게 할지 고민해보자
        this.loadState();
    }

    loadState()  {
        // local 에 저장된 데이터를 읽어온다
        this.state = new GameState();
        this.state.introWatched = localStorage.getItem("intro");
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

    handleWatchIntro() {
        localStorage.setItem("intro", true);
        this.state.introWatched = true;
    }

    handleHyperdriveOn() {
        this.state.hyperdrive = "on";
    }

    handleHyperdriveOff() {
        this.state.hyperdrive = "off";
    }

    handleChangeMode(from, to) {
        if (this.state.mode === from ) {
            this.state.mode = to;
        }
    }
}

decorate(GameStore, {
    handleLoginSuccessed: action,
    spinnerOn : action,
    spinnerOff : action,
    handleGoTown: action,
    handleGoSlot: action,
    handleGoAttack: action,
    handleGoRaid: action,
    handleWatchIntro: action,
    handleHyperdriveOn: action,
    handleHyperdriveOff: action,
});


export default alt.createStore(GameStore, "GameStore");