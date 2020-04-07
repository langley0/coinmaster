import { observable, decorate } from "mobx";

class GameState {
    spinner = 0;
    mode = "town";
    authenticated = false;
    introWatched = false;
}

decorate(GameState, {
    spinner: observable,
    authenticated: observable,
    mode: observable,
    introWatched: observable,
});

export default GameState;