// 플레이어 원본 데이터
const player = {
    name: "",
    gold: 0,
    stage:1,
    buildings: [ 0, 0, 0, 0, 0],
    spin: 5,
};

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

class GameRepository {
    
    async login(userid) {
        player.name = userid;
        await sleep(100);
        return player;
    }

    async spin() {
        // 룰렛 
        await sleep(100);
        // 일단 족보를 만들기전에 랜덤으로 
        // TODO: 결과 목록을 미리 선언하여야 한다
        player.spin -= 1;
        player.gold += 2000;

        return [Math.floor(Math.random() * 6), Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)];
    }

    async sync() {
        await sleep(100);
        return player;
    }
}

export default new GameRepository();