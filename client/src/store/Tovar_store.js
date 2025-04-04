import { makeAutoObservable } from "mobx";
import Tovar_Service from "../services/Tovar_Service";
import axios from "axios";
import { API_URL } from "../http";


export default class Tovar_store {

    _tovar = {};
    _isCreate = false;
    _isSearch = false;
    _allTovars = [];


    constructor() {
        makeAutoObservable(this);
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

    async create_tovar_warehouse(formData) {
        try {
            
            const response = await Tovar_Service.create_tovar_warehouse(formData);

            const tovar = response.data
            console.log("tovar====>", tovar )
            this.setTovar(tovar);

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getAll_tovars_warehouse() {
        try {
            const response = await Tovar_Service.getAll_tovars_warehouse();
            
            const tovars = response.data
            console.log("tovars====>", tovars )
             this.setAllTovars(tovars);



        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {

        }
    }



}