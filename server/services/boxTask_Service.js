
const { BoxTask, Tovar_for_boxTask, Tovar_For_Task, Tovar_For_Warehouse, Photo_For_Tovar, Sticker } = require('../models/models');
const { update_quantity } = require('./tovar_forTask_Service');


class BoxTask_Service {

    async addTovar_boxTask(formData) {

        console.log("addTovar_boxTask ")
        console.log("formData===>>> ", formData)

        let isBox_exist = await BoxTask.findOne({
            where: { id: formData.boxTaskId },
        })

        let boxTaskId = formData.boxTaskId
        let boxTask;
        console.log("boxTaskId===>>> ", boxTaskId)
        console.log("boxTask===>>> ", boxTask)

        if (!isBox_exist) {
            boxTask = await BoxTask.create(formData);
            boxTaskId = boxTask.id
        }

        await Tovar_for_boxTask.create(formData);

        boxTask = await BoxTask.findOne({
            where: { id: boxTaskId },
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

        console.log("getAllBoxes_for_currentTask taskId ===>>> ", taskId)


        const boxes_for_task = await BoxTask.findAll({

            include: [
                {
                    model: Tovar_for_boxTask, as: "tovar_for_boxTasks",
                    include: [
                        {
                            model: Tovar_For_Task, as: "tovar_for_task",
                            include: [
                                {
                                    model: Tovar_For_Warehouse, as: "tovar_for_warehouse",
                                    include: [
                                        {
                                            model: Photo_For_Tovar, as: "photo_for_tovars",
                                            attributes: ['img_name'],
                                        }
                                    ]
                                },
                                {
                                    model: Sticker, as: "sticker",
                                    
                                }
                            ]
                        }
                    ]
                }
            ],
            where: { taskId: taskId }

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