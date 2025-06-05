const BoxTask_Service = require('./../services/boxTask_Service');
const ApiError = require('../error/ApiError');
const Tovar_forTask_Service = require("./../services/tovar_forTask_Service")
const { createPath, uploadFile } = require('../services/FotoUploader');

class BoxTask_Controller {


    async addTovar_boxTask(req, res, next) {
        try {

            const formData = req.body;
            const tovarForTask = await BoxTask_Service.addTovar_boxTask(formData)

            return res.json(tovarForTask);

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }
    }


    async getAllBoxes_for_currentTask(req, res, next) {
        try {
            const boxes_for_task = await BoxTask_Service.getAllBoxes_for_currentTask(req.body.taskId)
           
            // boxes_for_task.map(async(box) => {
            //     console.log()
            //     box.tovar_for_boxTasks.map(async(tovar_for_boxTask)=>{
            //         const tovarForTaskId = tovar_for_boxTask.tovarForTaskId
            //         tovar_for_boxTask.tovarForTaskId = await Tovar_forTask_Service.getById(tovarForTaskId);
            //     })
            // })

            return res.json(boxes_for_task);

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }

    }




    async getOne(req, res, next) {

    }
}

module.exports = new BoxTask_Controller()