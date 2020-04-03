import alt from "../alt"

class PlayerActions {
    constructor() {
        this.generateActions(
            "login"
        );
    }
}


export default alt.createActions(PlayerActions);
