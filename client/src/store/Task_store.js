import { makeAutoObservable } from "mobx";
import Task_Service from "../services/Task_Service";
import Help_Service from "../services/Help_Service";


export default class Task_store {

    _task = [];
    _isCreate = false;
    _isSearch = false;
    _allTasks = [];
    _isLoading = false;
    // _executor = "не назначен"

    constructor() {
        makeAutoObservable(this);
    }

    setIsLoading(bool) {
        this._isLoading = bool;
    }

    get isLoading() {
        return this._isLoading;
    }

    setExecutor(str) {
        this._executor = str;
    }

    get executor() {
        return this._executor;
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

            this.setIsCreate(true)
            const response = await Task_Service.create_task(taskData);



            const task = response.data

            // console.log("task===============>  ", task);
            // let mutate_allTasks = [ task, ...this.allTasks];

           

            // // mutate_allTasks.unshift(task);
            // console.log("task=====================>>>> ", task)
            // console.log("mutate_allTasks=====================>>>> ", mutate_allTasks)


            // this.setAllTasks(mutate_allTasks);
            // console.log("task====>", task)
            this.setTask(task);
            this.setIsCreate(false);

            return task

        } catch (e) {
            console.log(e.response?.data?.message);
        } finally{
            this.setIsCreate(false)
        }
    }


    async get_all_tasks() {
        try {
            this.setIsLoading(true)
            const response = await Task_Service.getall_tasks();

            const tasks = response.data

            // console.log("tasks = response.data ===================================> ",tasks)
        
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
           
            console.log("task_id::: ", response.data)
            const task = response.data

            // console.log("get_one===================================> ", task)

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

    async set_executor(task_id, worker_id){
        try {
            this.setIsLoading(true)
        
            const response = await Task_Service.set_executor(task_id, worker_id);
            
            const updated_task = response.data

            let arrForMutate = [... this._allTasks]
    
            arrForMutate.map((task, index) => {
                if(task.id === updated_task.id){
                    arrForMutate[index] = updated_task
                }
            })

            this.setAllTasks(arrForMutate)
    
            this.setIsLoading(false)
            
        } catch (e) {
            console.log(e.response?.data?.message);
        }finally{
            this.setIsLoading(false)
        }
       


    }



}