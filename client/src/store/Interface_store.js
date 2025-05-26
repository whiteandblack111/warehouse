import { makeAutoObservable } from "mobx";
import Task_Service from "../services/Task_Service";


export default class Interface_store {

    _isMobile = false;

    _isOpen_addTovar_forTask = false;

    _status_allowed_to_delete = false
    

    constructor() {
        makeAutoObservable(this);
    }

    setIsMobile(bool) {
        this._isMobile = bool;
    }
    get isMobile() {
        return this._isMobile;
    }

    setIsOpen_addTovar_forTask(bool) {
        this._isOpen_addTovar_forTask = bool;
    }
    get isOpen_addTovar_forTask() {
        return this._isOpen_addTovar_forTask;
    }

    setStatus_allowed_to_delete(bool) {
        this._status_allowed_to_delete = bool;
    }
    get isStatus_allowed_to_delete() {
        return this._status_allowed_to_delete;
    }





}