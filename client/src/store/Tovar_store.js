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
    _response_message = "";


    constructor() {
        makeAutoObservable(this);
    }

    setResponse_message(text) {
        this._response_message = text;
    }

    get response_message() {
        return this._response_message;
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

            let new_allTovars = [
                ...this._allTovars
            ]
            new_allTovars.unshift(tovar);


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

    async getOne_tovar_warehouse(id) {
        try {
            this.setIsLoading(true)
            const response = await Tovar_Service.getOne_tovar_warehouse(id);

            const tovar = response.data

            await Help_Service.sortData_for_upDown(tovar, "id")

            this.setAllTovars(tovar);
            this.setIsCreate(false);
            this.setIsLoading(false)

            return tovar

        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false)
        }
    }

    async update_tovar_warehouse(formData) {
        try {
            this.setIsLoading(true)

            console.log("asdassaddsaasdadsdsadsa ", formData)
            const response = await Tovar_Service.update_tovar_warehouse(formData);

            const tovar = response.data
            console.log("tovar.id ", typeof tovar.id)
            console.log("formData.id ", typeof formData.id)
            if (tovar.id === formData.id) {

                const allTovars_mutate = this.allTovars.map((tovar_item) => {
                    if (tovar.id === tovar_item.id) {
                        tovar_item.quantity = tovar.quantity
                    }
                    return tovar_item
                })

                this.setAllTovars(allTovars_mutate)
            }


            this.setIsLoading(false)

            return tovar

        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false)
        }
    }

    async delete_tovar_warehouse(id) {
        try {

            this.setIsLoading(true)
            const response = await Tovar_Service.delete_tovar_warehouse(id)

            if (response.status && response.status === 200) {
          
                this.setAllTovars(this.allTovars.filter(t=>t.id !== id))

                this.setIsLoading(false)
                this.setResponse_message = "Товар удалён из базы данных!"
            }

            return this.response_message
            
        } catch (error) {
            console.log(error.response?.data?.message);
        } finally {
            this.setIsLoading(false)
        }
    }



}