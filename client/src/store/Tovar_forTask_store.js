import { makeAutoObservable } from "mobx";
import Tovar_forTask_Service from "../services/Tovar_forTask_Service";
import axios from "axios";
import { API_URL } from "../http";


export default class Tovar_store {

    _tovar = {};
    _isCreate = false;
    _isSearch = false;
    _allTovars = [];
    _status = "default";
    _isLoading = false;


    constructor() {
        makeAutoObservable(this);
    }

    setIsLoading(bool) {
        this._isLoading = bool;
    }
    get isLoading() {
        return this._isLoading;
    }

    setStatus(status) {
        this._status = status;
    }
    get status() {
        return this._status;
    }
    
    setTovar(tovar) {
        this._tovar = tovar;
    }
    get tovar() {
        return this._tovar;
    }
    
    setAllTovars(tovars) {
        this._allTovars = tovars;
    }
    get allTovars() {
        return this._allTovars;
    }

    setIsCreate(bool) {
        this._isCreate = bool;
    }
    get isCreate() {
        return this._isCreate;
    }

    setIsSearch(bool) {
        this._isSearch = bool;
    }
    get isSearch() {
        return this._isSearch;
    }

    async update_tovar_forTask(formData) {
        try {
            
            this.setIsLoading(true);
            const response = await Tovar_forTask_Service.update_tovar_forTask(formData);
            console.log("formData====>", formData )
            const tovar = response.data
            this.setTovar(tovar);
            this.setIsLoading(false);

            return this.tovar

        } catch (e) {
            console.log(e.response?.data?.message);
        }finally{
            this.setIsLoading(false);
        }
    }

    async getAll() {
        try {
            const response = await Tovar_forTask_Service.getAll();
            
            const tovars = response.data
            // console.log("tovars====>", tovars )
             this.setAllTovars(tovars);



        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {

        }
    }



}