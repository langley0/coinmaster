import { observable, action, decorate } from "mobx";

class Environment {
    isLoading = false;
    showLoader() {
        this.isLoading = true;
    }

    hideLoader() {
        this.isLoading = false;
    }
}

decorate(Environment, {
    isLoading: observable,
    showLoader: action,
    hideLoader: action,
});

export default Environment;