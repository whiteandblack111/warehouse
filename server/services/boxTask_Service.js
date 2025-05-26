
const { BoxTask, Tovar_for_boxTask } = require('../models/models');
const { update_quantity } = require('./tovar_forTask_Service');


class BoxTask_Service {

    async addTovar_boxTask(formData) {

        let boxTask = await BoxTask.create(formData);

        const tovarsData = {
            boxTaskId: boxTask.id,
            taskId: formData.taskId,
            quantityTovar: formData.quantityTovar,
            tovarForTaskId: formData.tovar_task_id,

        }

        const tovar_for_boxTask = await Tovar_for_boxTask.create(tovarsData);

        boxTask = await BoxTask.findOne({
            where: { id: boxTask.id },
            include: [

                {
                    model: Tovar_for_boxTask, as: "tovar_for_boxTasks"
                }
            ],
            raw: true, // <----- HERE
            nest: true, // <----- HERE
        })

        console.log("boxTask.result===>>> ", boxTask)
        return boxTask
    }

    async getAllBoxes_for_currentTask(taskId) {


        const boxes_for_task = await BoxTask.findAll({
            where: { id: taskId },
            include: [

                {
                    model: Tovar_for_boxTask, as: "tovar_for_boxTasks"
                }
            ],
            raw: true, // <----- HERE
            nest: true, // <----- HERE
        })

        console.log("boxTask.result===>>> ", boxes_for_task)
        return boxes_for_task
    }


    async getOne() {


    }

    async getAll() {

    }

}

module.exports = new BoxTask_Service()