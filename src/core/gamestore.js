import { observable } from "mobx";

import gameRepository from "./gamerepository";
import PlayerModel from "./playermodel";

class GameStore {
    @observable
    player = null;

    async *login(username) {
        const player = yield gameRepository.login(username);
        this.player = new PlayerModel(player);
    }
}

export default GameStore;