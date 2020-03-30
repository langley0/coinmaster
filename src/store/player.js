import { observable, flow, decorate } from "mobx";
import respository from "../core/gamerepository";

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

class Player {
    isLoaded = false;
    name = null;
    gold = 0;
    spin = 5;
    spinMax = 50;

    load = flow(function *(username) {
        yield sleep(1000);
        const player = yield respository.login(username);
        // 여기에 알아서 저장...
        this.isLoaded = true;
        this.name = username;
        this.gold = player.gold;
        this.spin = player.spin;
    }).bind(this);

    spinReel = flow(function *() {
        yield sleep(10);
        if (this.spin > 0) {
            this.spin -= 1;
        }
    }).bind(this);

}

decorate(Player, {
    isLoaded: observable,
    gold: observable,
    spin: observable,
});

export default Player;