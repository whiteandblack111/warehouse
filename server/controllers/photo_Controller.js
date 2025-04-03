const ApiError = require('../error/ApiError');
const PhotoService = require('../services/photo_Service')
const {createPath, uploadFile} = require('../services/FotoUploader')

class PhoToController {
    

    async create_foto_for_tovar(req, res) {

        const fileFoto = req.files

        const filePath = createPath('tovar');
        const fileName = uploadFile(filePath, fileFoto)
    
        const tovar_photo = PhotoService.create(filePath,fileName, req.tovar_barcode);
        return res.json(tovar_photo);

    }

    async add(req, res) {

        const fileFoto = req.files

        await Photo_For_Tovar.create({
            img_path: filePath,
            img_name: fileName,
            tovar_barcode: fileName
        });

        const filePath = createPath('persona');
        const fileName = uploadFile(filePath, fileFoto)

    }


    async getAll(req, res) {

    }


    async getById(req, res) {

    }
}

module.exports = new PhoToController()