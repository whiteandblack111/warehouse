import { makeAutoObservable } from "mobx";
import Tovar_Service from "../services/Tovar_Service";
import axios from "axios";
import { API_URL } from "../http";
import Help_Service from "../services/Help_Service";


export default class Tovar_store {

    _tovar = {};
    _isCreate = false;
    _isSearch = false;
    _allTovars = [];
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

            // console.log("1 tovar-----------------> ", tovar)

            let new_allTovars = [
                ...this._allTovars
            ]
            new_allTovars.unshift(tovar);

            // console.log("2 new_allTovars-----------------> ", new_allTovars)

            this.setAllTovars(new_allTovars);
            this.setIsCreate(false);
            this.setIsSearch(false);
            this.setTovar(tovar)

            // console.log("3 this.allTovars-----------------> ", this.allTovars)

            return tovar


        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getAll_tovars_warehouse() {
        try {
            this.setIsLoading(true)
            const response = await Tovar_Service.getAll_tovars_warehouse();
            
            const tovars = response.data
            console.log("tovars====>", tovars)

            await Help_Service.sortData_for_upDown(tovars, "id")

             this.setAllTovars(tovars);
             this.setIsCreate(false);
             this.setIsLoading(false)

        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {

        }
    }



}