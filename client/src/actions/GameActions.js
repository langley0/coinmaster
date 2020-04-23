import alt from "../alt"

class GameActions {
    constructor() {
        this.generateActions(
            "loginSuccessed",
            "loginFailed",
            "showSpinner",
            "hideSpinner",
            "goTown",
            "goRaid",
            "watchIntro",
            "hyperdriveOn",
            "hyperdriveOff",
        );
    }

    goAttack() {
        return (dispatch) => {
            this.hyperdriveOn();
            
            setTimeout(() => {
                dispatch();
                this.hyperdriveOff();
            }, 5000);
        };
    }

    goSlot() {
        return (dispatch) => {
            this.hyperdriveOn();
            setTimeout(() => {
                dispatch();
                this.hyperdriveOff();
            }, 1500);
        };
    }

    changeMode(from, to) {
        return (dispatch) => {
            if ((from === "town" && to=== "slot") ||
                (from === "slot" && to=== "town")) {
                dispatch(from, to);
            } else {
                this.hyperdriveOn();
                setTimeout(() => {
                    dispatch();
                    this.hyperdriveOff();
                }, 1500);
            }
        }
    }
}


export default alt.createActions(GameActions);
