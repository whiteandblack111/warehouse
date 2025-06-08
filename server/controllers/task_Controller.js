const ApiError = require('../error/ApiError');
const { User, Tovar_For_Task } = require('../models/models');
const sticker_Service = require('../services/sticker_Service');
const Task_Service = require('../services/task_Service');
const tovar_forTask_Service = require('../services/tovar_forTask_Service');
const Tovar_Service = require('./../services/tovar_Service');

class Task_Controller {
    async create(req, res) {
    

        const taskData = {
            task_name: req.body.task_name,
            shop_name: req.body.shop_name,
            userId: req.body.userId
        }
        const task = await Task_Service.create(taskData);
        console.log("1 task.isNewRecord---------------------------> ", task.id)


        const tovars = req.body.tovars_for_task

        await tovars.map(async (tovar) => {
        

            const sticker = await sticker_Service.get_by_barcode(tovar.barcode);
            console.log("sticker-----> ",sticker )

    
            let mutateTovar = {
                ...tovar,
                taskId: task.id,
                stickerId:sticker.id,
                tovarForWarehouseId: sticker.tovarForWarehouseId,
                status: "default"
            }

            console.log("mutateTovar-----> ",mutateTovar )


            await tovar_forTask_Service.create(mutateTovar);
        })

        
        const task_with_goods = await Task_Service.getOne(task.id);

        return res.json(task_with_goods)
    }


    async getOne(req, res) {
        console.log("req.bodyreq.body req.body===========>",req.body)
        const { id, task_number } = req.body;
        
        let task;
        if (id) {
            task = await Task_Service.getOne(id);
        }
        if (task_number) {
            task = await Task_Service.getOne_byNumber(task_number);
        }


        //сортировать товары в таске по порядку следования id
        const tovarSort = task.tovar_for_tasks;
        tovarSort.sort((a, b) => (+a.id) - (+b.id));
        task.tovar_for_tasks = tovarSort

        return res.json(task)
    }

    async set_executor(req, res) {
        const { task_id, worker_id } = req.body;

        let task = await Task_Service.set_executor(task_id, worker_id);



        return res.json(task)
    }

    async getAll(req, res) {
        let { statusWork, executor, createAt, from_and_to_number, limit, page } = req.body;

        page = page || 1
        limit = limit || 100
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