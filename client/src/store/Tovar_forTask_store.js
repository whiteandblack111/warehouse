import { makeAutoObservable } from "mobx";
import Tovar_forTask_Service from "../services/Tovar_forTask_Service";
import axios from "axios";
import { API_URL } from "../http";
import Help_Service from "../services/Help_Service";


export default class Tovar_forTask_store {

    _tovar_task = {};
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

    setTovarTask(tovar_task) {
        this._tovar_task = tovar_task;
    }
    get tovarTask() {
        return this._tovar_task;
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

            console.log("formData====>", formData)
            this.setIsLoading(true);
            const response = await Tovar_forTask_Service.update_tovar_forTask(formData);
            const tovar = response.data;

            if (tovar.id === formData.tovar_task_id) {

                this.setIsLoading(false);

                return tovar


            }




        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false);
        }
    }

    async add_tovar_forTask(formData) {
        try {

            this.setIsLoading(true);
            const response = await Tovar_forTask_Service.add_tovar_forTask(formData);
            console.log("formData====>", formData)
            const tovar = response.data
            this.setTovar(tovar);
            this.setIsLoading(false);

            return this.tovar

        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false);
        }
    }

    async getAll() {
        try {
            this.setIsLoading(true);
            const response = await Tovar_forTask_Service.getAll();

            const tovars = response.data
            // console.log("tovars====>", tovars )
            this.setAllTovars(tovars);



            this.setIsLoading(true);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {

            this.setIsLoading(true);
        }
    }

    async deleteTovar_fromTask(formData) {
        try {

            this.setIsLoading(true)

            if (formData.role === "ADMIN") {

                const response = await Tovar_forTask_Service.deleteTovar_fromTask(formData)
                const tovar = response.data;

                console.log("tovar = response.data;  ", tovar)
                this.setIsLoading(false)
                return tovar

            }



            if (formData.role === "WORKER") {

                const response = await Tovar_forTask_Service.deleteTovar_fromTask(formData)

                if (response.status && response.status === 200) {

                    this.setAllTovars(this.allTovars.filter(t => t.id !== formData.tovar_task_id))

                    this.setIsLoading(false)
                }

            }



        } catch (error) {
            console.log(error.response?.data?.message);
        } finally {
            this.setIsLoading(false)
        }
    }


}