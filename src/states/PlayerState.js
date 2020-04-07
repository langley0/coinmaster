import { observable, decorate } from "mobx";

class Player {
    name = null;
    gold = 0;
    star = 0;
    shield = 0;
    spin = 5;
    spinMax = 50;
    stage = 1;
    justCreated = false;
    nextSpin = 0;
    buildings = [ 0, 0, 0, 0, 0];
}

decorate(Player, {
    justCreated: observable,
    stage: observable,
    gold: observable,
    shield: observable,
    star: observable,
    spin: observable,
    buildings: observable,
});

export default Player;