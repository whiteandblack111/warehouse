const ApiError = require('../error/ApiError');
const Task_Nikita_Service = require('../services/task_nikita_Service');

class Task_Nikita_Controller {
    async create(req, res) {
        const taskData = {
            shop_name: req.body.shop_name,
            task_number: req.body.task_number,
            marketplace_name: req.body.marketplace_name
        }
        const task = await Task_Nikita_Service.create(taskData);

        return res.json(task)
    }

    async getOne(req, res) {
        const { id, task_number } = req.body;
        let task;
        if (id) {
            task = await Task_Nikita_Service.getOne_byId(id);
        }
        if (task_number) {
            task = await Task_Nikita_Service.getOne_byNumber(task_number);
        }


        //сортировать товары в таске по порядку следования id
        const tovarSort = task.tovar_for_task_nikita;
        tovarSort.sort((a, b) => (+a.id) - (+b.id));
        task.tovar_for_task_nikita = tovarSort

        return res.json(task)
    }

    async getAll(req, res) {
        let { statusWork, executor, createAt, from_and_to_number, limit, page } = req.body;
        
        page = page || 3
        limit = limit || 1
        let offset = page * limit - limit

        let tasks;

        if (!statusWork && !executor && !createAt) {
            tasks = await Task_Nikita_Service.getAll(limit, offset);
        }
        if (statusWork) {
            tasks = await Task_Nikita_Service.getAll_statusWork(statusWork, limit, offset);
        }
        if (executor) {
            tasks = await Task_Nikita_Service.getAll_executor(executor, limit, offset);
        }
        if (createAt) {
            tasks = await Task_Nikita_Service.getAll_createAt(createAt, limit, offset);
        }

        return res.json(tasks)

    }
}

module.exports = new Task_Nikita_Controller()