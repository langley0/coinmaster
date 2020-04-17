import { observable, decorate } from "mobx";

class GameState {
    spinner = 0;
    mode = "town";
    authenticated = false;
    introWatched = false;
    hyperdrive = "none";
}

decorate(GameState, {
    spinner: observable,
    authenticated: observable,
    mode: observable,
    introWatched: observable,
    hyperdrive: observable,
});

export default GameState;