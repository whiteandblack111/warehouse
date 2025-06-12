import { makeAutoObservable } from "mobx";
// import Task_Service from "../services/Task_Service";


export default class Bot_messages_store {

    _is_open_bot = false;

    _bot_Message = ""

    _isErrors = false;

    constructor() {
        makeAutoObservable(this);
    }

    set_isErrors(bool) {
        this._isErrors = bool;
    }
    get isErrors() {
        return this._isErrors;
    }

    set_Bot_Message(message) {
        this._bot_Message = message;
    }
    get bot_Message() {
        return this._bot_Message;
    }

    set_Open_Bot(bool) {
        this._is_open_bot = bool;
    }

    get is_Open_Bot() {
        return this._is_open_bot;
    }

}