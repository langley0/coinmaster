import STAGE from "../data/stage";

// 플레이어 원본 데이터
const InitialData = {
    name: "",
    justCreated: true,
    gold: 75000,
    stage:1,
    buildings: [ 0, 0, 0, 0, 0],
    spin: 5,
    spinMax: 50,
    star: 0,
    nextSpin: 0,
};

const spinPerHour = 5;
const hourMSec = 3600*1000;

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

function differ(src, dst) {
    // src -> dst 로 변화를 추적한다
    // 항목이 추가되는 것은 추적이 가능하나
    // 삭제되는 것은 추적할수 없다
    return Object.keys(dst).reduce((result, key) => {
        if (JSON.stringify(dst[key]) !== JSON.stringify(src[key])) {
            result[key] = dst[key];
        }
        return result;
    }, {});
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

class GameRepository {
    
    async login(userid) {
        let player = load();
        if (!player) {
            player = Object.assign({}, InitialData);
            player.name = userid;
            player.nextSpin = Date.now() + hourMSec; // 1시간 후

            save(player);
        }

        await sleep(10);
        return player;
    }

    async spin() {
        await sleep(100);

        // 룰렛 
        const candidates = [
            { reel: [0, 0, 0], reward: { spins: 10 } },
            { reel: [1, 1, 1], reward: { gold: 5000 } },
            { reel: [2, 2, 2], reward: { gold: 20000 } },
            { reel: [3, 3, 3], reward: { attack: true } },
            { reel: [4, 4, 4], reward: { shield: 1 } },
            { reel: [5, 5, 5], reward: { raid: true } },
        ];

        const slotResult = candidates[Math.floor(Math.random() * candidates.length)];

        // 결과를 적용한다
        // attack 과 raid 를 자신의 attack/raid 타겟을 어딘가에 기록해놓는다
        // attack 과 raid 는 일정시간동안 유효하며 일정시간이 지나면 파괴된다. (redis?)
        const player = load();
        this._consumeSpin(player, 1);
        player.gold += 2000;
        save(player);

        return slotResult;
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
        await sleep(1000);
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

    async attack() {
        const player = load();
        await sleep(1000);
        const goldReward = 5000;
        player.gold += goldReward;
        save(player);
        return { gained: goldReward, total: player.gold };
    }

    async raid() {
        const player = load();
        await sleep(1000);
        const goldReward = 5000;
        player.gold += goldReward;
        save(player);
        return { gained: goldReward, total: player.gold, finished: true };
    }

    async update(player) {
        const src = clone(player);
        
        // clone 을 만든다
        // 시간에 기초한 데이터를 업데이트 한다
        if (player.spin < player.spinMax) {
            // 시간을 기록한다
            const now = Date.now();
            const elapsedTime = (now - player.nextSpin);
    
            const hours = Math.floor(elapsedTime / hourMSec);
            player.nextSpin += (hours + 1) * hourMSec;
            const added = Math.min(player.spinMax, player.spin+ hours * spinPerHour) - player.spin;
            this._addSpin(player, added);
        }
    
        return differ(src, player);
    }

    _addSpin(player, spins)  {
        player.spin += spins;
        if (player.spin >= player.spinMax) {
            player.nextSpin = 0;
        } 
    }

    _consumeSpin(player, spins) {
        player.spin -= spins;
        if (player.spin < player.spinMax && player.nextSpin === 0) {
            player.nextSpin = Date.now() + hourMSec;
        } 
    }

}

export default new GameRepository();