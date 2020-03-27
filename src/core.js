// 게임 코어를 작성한다
// 스테이지를 진행하고, 돈을 모으로 집을 짓고, 공격/방어를 진행하게 된다
// 이후에 서버로 옮길 코드이다

const user = {
    name: "user",
    gold: 0,
    stage:1,
    buildings: [ 0, 0, 0, 0, 0],
    spin: 5,
};


class Server {
    constructor() {
        this.handler = this.handler.bind(this);
    }

    start() {
        window.addEventListener("to-server", this.handler);
    }

    stop() {
        window.addEventListener("to-server", this.handler);
    }

    send(data) {
        // 내부에서 메시지를 보내는 것처럼 한다
        window.postMessage("to-client", data);
    }   
    
    handler(data) {
        switch(data.type) {
            case "login":
                this.login(data.message);
                break;
            default:
                throw new Error("invalid message type: " + data.type);
        }
    }

    login(message) {
        this.send({ type: "login", message: JSON.stringify(user)})
    }

    send(data) {
        // 내부에서 메시지를 보내는 것처럼 한다
        window.postMessage("to-client", data);
    }   
}

class Client {
    constructor() {
        this.handler = this.handler.bind(this);
        this.user = null;
    }

    start() {
        window.addEventListener("to-client", this.handler);
    }

    stop() {
        window.addEventListener("to-client", this.handler);
    }

    send(data) {
        // 내부에서 메시지를 보내는 것처럼 한다
        window.postMessage("to-server", data);
    }   
    
    handler(data) {
        switch(data.type) {
            case "login":
                break;
            default:
                throw new Error("invalid message type: " + data.type);
        }
    }
}
