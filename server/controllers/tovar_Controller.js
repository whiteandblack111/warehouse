const Tovar_Service = require('../services/tovar_Service');
const ApiError = require('../error/ApiError');
const { createPath, uploadFile } = require('../services/FotoUploader');
const PhotoService = require('../services/photo_Service');

class tovar_Controller {
    async create_tovar_for_warehouse(req, res, next) {
        try {
            console.log("create_tovar_for_warehouse====>", req.body)
            const formData = {
                manufacturer_ID: req.body.manufacturer_ID,
                name: req.body.name,
                quantity: req.body.quantity,
                width: req.body.width,
                height: req.body.height,
                long: req.body.long,
            }

            const { tovar_photo } = req.files

            const tovar = await Tovar_Service.create_for_warehouse(formData)

            const filePath = createPath();
            const fileName = uploadFile(filePath, tovar_photo);
            await PhotoService.create(filePath, fileName, tovar.id);


            const dataTovar = await Tovar_Service.getOneFromWarehouseById(tovar.id);
            console.log("tovar>>>", tovar)
            console.log("dataTovar>>>", dataTovar)


            return res.json(dataTovar);

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }
    }




    async create_tovar_for_task(req, res, next) {
        try {
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

                await Tovar_Service.create_for_task(formData)
                return tovarData
            }));

            return res.json(tovars)

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }


    }

    async update_quantity_tovar_for_task(req, res, next) {

        const formData = {
            id: req.body.id,
            cartons_found: req.body.cartons_found,
        }


        const tovarData = await Tovar_Service.update_quantity_tovar_for_task(formData)
        return res.json(tovarData)
    }

    async update(req, res, next) {
        try {
            console.log("updateupdateupdate==== ", req.body)
            const tovarData = await Tovar_Service.update_quantity_tovar_for_warehouse(req.body)
            return res.json(tovarData)
        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }

    }


    async getAll(req, res) {
        const tovarData = await Tovar_Service.getAll()
        console.log(tovarData)
        return res.json(tovarData)
    }


    async getOne(req, res) {
        console.log("req.body.id++++++ ========= ", req.body.id)
        const tovarData = await Tovar_Service.getOneFromWarehouseById(req.body.id)
        console.log(tovarData)
        return res.json(tovarData)
    }

    async delete_tovar_warehouse(req, res){
        const result = await Tovar_Service.delete_tovar_warehouse(req.body.id);
        return res.json(result)
    }
}

module.exports = new tovar_Controller()