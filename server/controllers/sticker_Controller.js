
const ApiError = require('../error/ApiError');
const Sticker_Service = require('../services/sticker_Service');
const { createPath, uploadFile } = require('../services/Sticker_Uploader');

class Sticker_Controller {
    async create(req, res) {
        try {
            console.log("req.body=========>", req.body)

            const { sticker_file } = req.files
            const filePath = createPath();
            const fileName = uploadFile(filePath, sticker_file, req.body.translit_name);

            console.log("fileName================>", fileName)

            
            const sticker = await Sticker_Service.create(
                filePath,
                fileName,
                req.body.barcode,
                req.body.shop_name,
                req.body.tovar_id
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