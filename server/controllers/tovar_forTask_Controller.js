const Tovar_forTask_Service = require('../services/tovar_forTask_Service');
const Task_Service = require('../services/task_Service');
const ApiError = require('../error/ApiError');
const { createPath, uploadFile } = require('../services/FotoUploader');
const PhotoService = require('../services/photo_Service');

class Tovar_forTask_Controller {


    async update_tovar_forTask(req, res, next) {
        try {
            console.log("update_tovar_forTask req.body====>", req.body)
            let dataTovar = {}
            if (req.body.quantity) {
                dataTovar = await Tovar_forTask_Service.update_quantity(req.body)
            }


            return res.json(dataTovar);

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }
    }

    async getAll_forTask(req, res) {

    }


    async getAll(req, res) {
    }


    async getOne(req, res) {

    }
}

module.exports = new Tovar_forTask_Controller()