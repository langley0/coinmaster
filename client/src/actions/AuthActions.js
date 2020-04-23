import alt from "../alt"
import GameActions from "./GameActions";
import PlayerActions from "./PlayerActions";

class AuthActions {
    constructor() {
        this.generateActions(
        );
    }

    initialize() {
        return async () => {
            GameActions.showSpinner();
            const username = localStorage.getItem("username");
            if (username) {
                // 로그인은 성공한 셈이다
                await PlayerActions.fetch(username);
                GameActions.loginSuccessed();
            } else {
                // 로그인 창으로 보낸다
            }
            GameActions.hideSpinner();
        }
    }

    login(username) {
        return async () => {
            GameActions.showSpinner();
            // 로그인은 일단 바로 성공한 것으로 간주한다
            localStorage.setItem("username", username);
            // 플레이어 데이터를 읽어온다
            await PlayerActions.fetch(username);
            GameActions.loginSuccessed();
            GameActions.hideSpinner();
        }
    }
}


export default alt.createActions(AuthActions);
