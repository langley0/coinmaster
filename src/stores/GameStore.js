import alt from "../alt";

class GameStore {
    constructor() {
        //this.state = new GameState();
    }

    getState() {
        // observable 데이터를 반환한다
        return this.state;
    }
}

export default alt.createStore(GameStore, "GameStore");