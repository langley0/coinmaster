import { observable, flow, decorate } from "mobx";
import respository from "../core/gamerepository";

class Player {
    mode = "login";
    name = null;
    gold = 0;
    spin = 5;
    spinMax = 50;

    // 업데이트를 딜레이 시켜서 원하는 시점에 업데이트를 한다
    pendingUpdates = [];

    load = flow(function *(username) {
        const player = yield respository.login(username);
        // 여기에 알아서 저장...
        this.mode = "game";
        this.name = username;
        this.gold = player.gold;
        this.spin = player.spin;
    }).bind(this);

    spinReel = flow(function *() {
        const result = yield respository.spin();
        this.spin -= 1;
        return {
            reels: result,
            reward: { gold: 2000 },
        }

    }).bind(this);

    sync = flow(function *() {
        const player = yield respository.sync();
        this.gold = player.gold;
        this.spin = player.spin;
    }).bind(this);
}

decorate(Player, {
    mode: observable,
    gold: observable,
    spin: observable,
});

export default Player;