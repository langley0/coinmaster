import alt from "../alt"

class GameActions {
    constructor() {
        this.generateActions(
            "loginSuccessed",
            "loginFailed",
            "showSpinner",
            "hideSpinner",
            "goTown",
            "goSlot",
            "goRaid",
            "watchIntro",
        );
    }

    goAttack() {
        return (dispatch) => {
            this.showSpinner();
            
            setTimeout(() => {
                dispatch();
                this.hideSpinner();
            }, 1000);
        };
    }
}


export default alt.createActions(GameActions);
