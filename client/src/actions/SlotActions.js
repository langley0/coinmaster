import alt from "../alt"
import PlayerActions from "./PlayerActions";

class SlotActions {
    constructor() {
        this.generateActions(
            "spinSuccessed",
        );
    }

    startSpin() {
        // 여기서 스핀을 돌리기 시작한다
        // 스핀의 속도나 그런것도 같이 처리할 수 있으려나
        return async (dispatch) => {
            dispatch();
            // 서버에 요청을 한다
            const result = await PlayerActions.spin();
            
            // 결과를 반환한다
            this.spinSuccessed(result);
            // spin failed 가 있어야 하나?
        };
    }
}


export default alt.createActions(SlotActions);
