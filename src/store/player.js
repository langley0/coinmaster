import { observable, flow, decorate } from "mobx";
import respository from "../core/gamerepository";

class Player {
    name = null;
    gold = 0;
    star = 0;
    spin = 5;
    spinMax = 50;
    stage = 1;
    justCreated = false;

    // 업데이트를 딜레이 시켜서 원하는 시점에 업데이트를 한다
    pendingUpdates = [];

    load = flow(function *(username) {
        const player = yield respository.login(username);
        // 여기에 알아서 저장...
        Object.assign(this, player);
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

    intro = flow(function *() {
        yield respository.intro();
        this.justCreated = false;
    }).bind(this);

    build = flow(function *(building) {
        const result = yield respository.build(building);
        // 결과를 적용한다
        if (result) {
            Object.assign(this, result);
        } else {
            // 실패, 알람을 띄워야 한다
        }
    }).bind(this);
}

decorate(Player, {
    justCreated: observable,
    stage: observable,
    buildings: observable,
    gold: observable,
    star: observable,
    spin: observable,
});

export default Player;