import { observable, action, decorate } from "mobx";

class Environment {
    mode = "";
    isLoading = false;
    showLoader() {
        this.isLoading = true;
    }

    hideLoader() {
        this.isLoading = false;
    }

    toHome() {
        this.setMode("game");
    }

    toRaid() {
        this.setMode("raid");
    }

    toAttack() {
        this.setMode("attack");
    }

    toLogin() {
        this.setMode("login");
    }

    setMode(mode) {
        this.mode = mode;
    }
}

decorate(Environment, {
    mode: observable,
    isLoading: observable,

    showLoader: action,
    hideLoader: action,
    setMode: action,
});

export default Environment;