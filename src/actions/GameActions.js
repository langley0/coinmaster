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
            "goAttack",
            "goRaid",
        );
    }
}


export default alt.createActions(GameActions);
