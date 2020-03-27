
import { extendObservable } from "mobx";

export default class PlayerModel {
    constructor(data)  {
        extendObservable(this, data);
    }
}