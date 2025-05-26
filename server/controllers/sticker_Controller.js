
const ApiError = require('../error/ApiError');
const Sticker_Service = require('../services/sticker_Service');
const { createPath, uploadFile } = require('../services/Sticker_Uploader');

class Sticker_Controller {
    async create(req, res, next) {
        try {
            console.log("req.body=========>", req.body)

            const { sticker_file } = req.files
            const filePath = createPath();
            const fileName = uploadFile(filePath, sticker_file, req.body.translit_name);

            console.log("fileName================>", fileName)

            const formData = {
                img_path: filePath,
                img_name: fileName,
                barcode: req.body.barcode,
                shop_name: req.body.shop_name,
                tovarForWarehouseId: req.body.tovar_id,
                warehouse_ID: req.body.warehouse_ID
            }

            const sticker = await Sticker_Service.create(
                formData
            );

            return res.json(sticker)

        } catch (error) {
            next(ApiError.bad_Request(error.message));
        }
    }


    async getOne(req, res) {


        return res.json()
    }

    async getAll(req, res) {

        return res.json()

    }
}

module.exports = new Sticker_Controller()