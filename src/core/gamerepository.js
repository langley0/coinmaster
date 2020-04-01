import STAGE from "../data/stage";

// 플레이어 원본 데이터
const InitialData = {
    name: "",
    justCreated: true,
    gold: 75000,
    stage:1,
    buildings: [ 0, 0, 0, 0, 0],
    spin: 5,
    star: 0,
};

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

function load() {
    const dataStr = localStorage.getItem("player");
    if (dataStr) {
        return JSON.parse(dataStr);
    } else {
        return null;
    }
}

function save(data) {
    localStorage.setItem("player", JSON.stringify(data));
}

class GameRepository {
    
    async login(userid) {
        let player = load();
        if (!player) {
            player = Object.assign({}, InitialData);
            player.name = userid;
            player.nextSpin = Date.now() + 3600*1000; // 1시간 후

            save(player);
        }

        await sleep(100);
        return player;
    }

    async spin() {
        // 룰렛 
        await sleep(100);
        // 일단 족보를 만들기전에 랜덤으로 
        // TODO: 결과 목록을 미리 선언하여야 한다
        const player = load();
        player.spin -= 1;
        player.gold += 2000;
        save(player);

        return [Math.floor(Math.random() * 6), Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)];
    }

    async sync() {
        await sleep(100);
        const player = load();
        return player;
    }

    async intro() {
        const player = load();
        player.justCreated = false;
        save(player);
    }

    async build(building) {
        const player = load();
        const currentStage = STAGE[player.stage];
        const currentLevel = player.buildings[building];
        if (currentLevel >= 3) {
            return null;
        }

        const price = currentStage[building][player.buildings[building]];
        if (player.gold < price) {
            return null;
        } 

        player.gold -= price;
        player.buildings[building] = currentLevel + 1;
        player.star += 1;

        save(player);

        return { gold: player.gold, buildings: player.buildings,  star: player.star };
    }
}

export default new GameRepository();