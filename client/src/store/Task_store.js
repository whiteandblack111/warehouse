import { makeAutoObservable } from "mobx";
import Task_Nikita_Service from "../services/Task_Nikita_Service";


export default class Task_store {

    constructor() {
        this._tasks = []
       
        makeAutoObservable(this);
    }

    setTasks(tasks) {
        this._tasks = tasks;
    }

    get Tasks() {
        return this._tasks;
    }


    async getall() {
        try {
            const response = await Task_Nikita_Service.getall();
            this.setTasks(response.data);

            console.log(response.data)

        }catch(e) {
            console.log(e.response?.data?.message);
        }
    }



}