import { makeAutoObservable } from "mobx";
import Task_Service from "../services/Task_Service";


export default class Task_store {

    _task = [];
    _isCreate = false;
    _isSearch = false;
    _allTasks = [];


    constructor() {


        makeAutoObservable(this);
    }

    setTask(task) {
        this._task = task;
    }

    get Task() {
        return this._task;
    }

    setAllTasks(tasks) {
        this._allTasks = tasks;
    }
    get allTasks() {
        return this._allTasks;
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

    async create_task(taskData) {
        try {

            const response = await Task_Service.create_task(taskData);

            const task = response.data
            console.log("task====>", task)
            this.setTask(task);

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }


    async get_all_tasks() {
        try {
            const response = await Task_Service.getall_tasks();

            const tasks = response.data
            console.log("tasks====>", tasks)
            this.setAllTasks(tasks);



        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {

        }
    }



}