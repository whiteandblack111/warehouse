const ApiError = require('../error/ApiError');
const Task_Service = require('../services/task_Service');
const Tovar_Service = require('./../services/tovar_Service');

class Task_Controller {
    async create(req, res) {
        console.log("req.body=========>", req.body)
        const taskData = {
            task_name: req.body.task_name,
            shop_name: req.body.shop_name
        }
        const task = await Task_Service.create(taskData);
        console.log("task.isNewRecord---------------------------> ", task.isNewRecord)
        

        const tovars = req.body.tovars_for_task

        await tovars.map( async (tovar) => {
            let mutateTovar = {
                ...tovar,
                taskId:task.id
            }
            await Tovar_Service.create_for_task(mutateTovar);
        })

        const task_with_goods = await Task_Service.getOne(task.id);

        return res.json(task_with_goods)
    }

    
    async getOne(req, res) {
        const { id, task_number } = req.body;
        let task;
        if (id) {
            task = await Task_Service.getOne_byId(id);
        }
        if (task_number) {
            task = await Task_Service.getOne_byNumber(task_number);
        }


        //сортировать товары в таске по порядку следования id
        const tovarSort = task.tovar_for_task_nikita;
        tovarSort.sort((a, b) => (+a.id) - (+b.id));
        task.tovar_for_task_nikita = tovarSort

        return res.json(task)
    }

    async getAll(req, res) {
        let { statusWork, executor, createAt, from_and_to_number, limit, page } = req.body;
        
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit

        let tasks;

        if (!statusWork && !executor && !createAt) {
            tasks = await Task_Service.getAll(limit, offset);
        }
        if (statusWork) {
            tasks = await Task_Service.getAll_statusWork(statusWork, limit, offset);
        }
        if (executor) {
            tasks = await Task_Service.getAll_executor(executor, limit, offset);
        }
        if (createAt) {
            tasks = await Task_Service.getAll_createAt(createAt, limit, offset);
        }

        return res.json(tasks)

    }
}

module.exports = new Task_Controller()