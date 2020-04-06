import { observable, decorate } from "mobx";

class GameState {
    spinner = 0;
    authenticated = false;
    mode = "town";
}

decorate(GameState, {
    spinner: observable,
    authenticated: observable,
    mode: observable,
});

export default GameState;