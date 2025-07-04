import { makeAutoObservable } from "mobx";
import BoxTask_Service from "../services/boxTask_Service";
import axios from "axios";
import { API_URL } from "../http";
import Help_Service from "../services/Help_Service";
import Task_Service from "../services/Task_Service";


export default class BoxTask_store {

    _isCreate = false;
    _isChahge = false;
    _isLoading = false;
    _boxes_for_task = [];


    constructor() {
        makeAutoObservable(this);
    }
// >>>>>>>>>>>>>>>>>>>>>>>
    setBoxes_for_task(boxes_for_task ) {
        this._boxes_for_task = boxes_for_task ;
    }
    get boxes_for_task() {
        return this._boxes_for_task;
    }
    // >>>>>>>>>>>>>>>>>>>>>>>
    setIsChahge(bool) {
        this._isChahge = bool;
    }
    get isChahge() {
        return this._isChahge;
    }

// >>>>>>>>>>>>>>>>>>>>>>>
    setIsLoading(bool) {
        this._isLoading = bool;
    }
    get isLoading() {
        return this._isLoading;
    }

// >>>>>>>>>>>>>>>>>>>>>>>
    setIsCreate(bool) {
        this._isCreate = bool;
    }
    get isCreate() {
        return this._isCreate;
    }

// >>>>>>>>>>>>>>>>>>>>>>>
    async getAllBoxes_for_currentTask(taskId){
        try {
            this.setIsLoading(true);
            const response = await BoxTask_Service.getAllBoxes_for_currentTask(taskId);

            const boxes_for_task = response.data;
            
            this.setBoxes_for_task(boxes_for_task)

       
            //   console.log("BoxTask_store this.boxes_for_task ===> ", this.boxes_for_task)

            this.setIsLoading(false);

            return boxes_for_task
            
        } catch (error) {
            console.log(error.response?.data?.message);
        }finally {
            this.setIsLoading(false);
        }
    }

    async addTovar_boxTask(formData) {
        try {

            // console.log("BoxTask_store_formData====>", formData)
            
            this.setIsChahge(true);
            const response = await BoxTask_Service.addTovars_boxTask(formData);
            const tovars = response.data;

            this.setIsChahge(false);

            return tovars


        } catch (error) {
            console.log(error.response?.data?.message);
        } finally {
            this.setIsLoading(false);
        }
    }


}