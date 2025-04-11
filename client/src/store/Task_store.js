import { makeAutoObservable } from "mobx";
import Task_Service from "../services/Task_Service";
import Help_Service from "../services/Help_Service";


export default class Task_store {

    _task = [];
    _isCreate = false;
    _isSearch = false;
    _allTasks = [];
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

    setTask(task) {
        this._task = task;
    }

    get task() {
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
            // console.log("task====>", task)
            this.setTask(task);

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }


    async get_all_tasks() {
        try {
            this.setIsLoading(true)
            const response = await Task_Service.getall_tasks();

            const tasks = response.data

            console.log("get_all_tasks===================================> ",tasks)
        
            await Help_Service.sortData_for_upDown(tasks.rows, "id")


            this.setAllTasks(tasks.rows);
            this.setIsLoading(false);

        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false)
        }
    }

    async get_one(task_id) {
        try {
            const response = await Task_Service.get_one(task_id);
           
            const task = response.data

            console.log("get_one===================================> ", task)

            this.setTask(task)

            // const taskList = this.allTasks

            // Object.taskList.forEach(function (item, i, arr) {
            //     if (item.id == task.id) {
            //         taskList[item.id] = task  // Новый объект с новыми свойствами
            //         // Или так Object.books[i].author = "..."; и так для каждого изменяемого свойства
            //     }
            // })


            // this.setAllTasks(task.rows);

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }



}