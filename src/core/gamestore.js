import { observable, flow, decorate } from "mobx";

import gameRepository from "./gamerepository";
import PlayerModel from "./playermodel";

class Store {
    player = null;
    login = flow(function* (username) {
        const player = yield gameRepository.login(username);
        this.player = new PlayerModel(player);
    }).bind(this);
}

decorate(Store, {
    player: observable,
});

export default Store;