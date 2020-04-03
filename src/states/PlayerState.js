import { observable, decorate } from "mobx";

class Player {
    name = null;
    gold = 0;
    star = 0;
    spin = 5;
    spinMax = 50;
    stage = 1;
    justCreated = false;
    nextSpin = 0;
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