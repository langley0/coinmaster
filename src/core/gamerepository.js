class GameRepository {
    
    login(userid) {
        const player = {
            name: "PLAYER" + userid,
            gold: 0,
            stage:1,
            buildings: [ 0, 0, 0, 0, 0],
            spin: 5,
        };

        return Promise.resolve(player);
    }
}

export default new GameRepository();