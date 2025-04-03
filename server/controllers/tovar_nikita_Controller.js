const Tovar_Nikita_Service = require('../services/tovar_nikita_Service');
const ApiError = require('../error/ApiError');
const { createPath, uploadFile } = require('../services/FotoUploader');
const PhotoService = require('../services/photo_Service');
const { json } = require('sequelize');

class tovar_nikita_Controller {
    async create_tovar_for_warehouse(req, res, next) {
        try {
            const tovarData = {
                manufacturer_ID: req.body.manufacturer_ID,
                warehouse_ID: req.body.warehouse_ID,
                barcode: req.body.barcode,
                name: req.body.name,
                quantity: req.body.quantity
            }
            const { tovar_img } = req.files

            const tovar_nikita = await Tovar_Nikita_Service.create_for_warehouse(tovarData)

            const filePath = createPath('tovar_nikita');
            const fileName = uploadFile(filePath, tovar_img);
            const tovar_photo = await PhotoService.create(filePath, fileName, tovar_nikita.id);

            const dataTovar = await Tovar_Nikita_Service.getOneFromWarehouseById(tovar_nikita.id);

            return res.json(dataTovar);

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }
    }




    async create_tovar_for_task(req, res, next) {

        const tovarList = req.body.tovarList

        const tovars = await Promise.all(tovarList.map(async (tovarData) => {
            const formData = {
                // manufacturer_ID: tovarData.manufacturer_ID,
                warehouse_ID: tovarData.warehouse_ID,
                barcode: tovarData.barcode,
                name: tovarData.name,
                cartons_required: tovarData.cartons_required,
                taskNikitumId: req.body.taskId
            }

            await Tovar_Nikita_Service.create_for_task(formData)
            return tovarData
        }));

        return res.json(tovars)
    }

    async update_quantity_tovar_for_task(req, res, next) {

        const formData = {
            id: req.body.id,
            cartons_found: req.body.cartons_found,
        }


        const tovarData = await Tovar_Nikita_Service.update_quantity_tovar_for_task(formData)
        return res.json(tovarData)
    }


    async getAll(req, res) {

    }


    async getOne(req, res) {

    }
}

module.exports = new tovar_nikita_Controller()