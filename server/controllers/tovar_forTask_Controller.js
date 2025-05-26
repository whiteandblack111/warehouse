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
            if (req.body.changed_cartons_required) {
                dataTovar = await Tovar_forTask_Service.update_quantity(req.body)
            }
            if (req.body.quantityBoxes) {
                dataTovar = await Tovar_forTask_Service.update_boxesQuantity(req.body)
            }

            if (req.body.stopReason) {
                dataTovar = await Tovar_forTask_Service.stopReason(req.body)
            }


            return res.json(dataTovar);

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }
    }


    async add_tovar_forTask(req, res, next) {
        try {
            console.log("req.body>>>>> ", req.body)



            const tovarForTask = await Tovar_forTask_Service.create(req.body)
            return res.json(tovarForTask);

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }

    }

    async deleteTovar_fromTask(req, res, next) {
        const result = await Tovar_forTask_Service.deleteTovar_fromTask(req.body);
        return res.json(result)
    }





}

module.exports = new Tovar_forTask_Controller()