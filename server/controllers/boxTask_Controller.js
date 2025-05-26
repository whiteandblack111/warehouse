const BoxTask_Service = require('./../services/boxTask_Service');
const ApiError = require('../error/ApiError');
const { createPath, uploadFile } = require('../services/FotoUploader');

class BoxTask_Controller {


    async addTovar_boxTask(req, res, next) {
        try {

            const formData = req.body;
            const tovarForTask = await BoxTask_Service.addTovar_boxTask(req.body)

            return res.json(formData);

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }
    }


    async getAllBoxes_for_currentTask(req, res) {
        try {
            const boxes_for_task = await BoxTask_Service.getAllBoxes_for_currentTask(req.body.taskId)

            return res.json(boxes_for_task);

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }

    }




    async getOne(req, res) {

    }
}

module.exports = new BoxTask_Controller()