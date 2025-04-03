const { Photo_For_Tovar_Nikita } = require("../models/models");


class PhotoService {

    async create(filePath, fileName, tovarForWarehouseNikitumId) {
        console.log("tovarForWarehouseNikitumId:::",tovarForWarehouseNikitumId)
        const tovar_photo = await Photo_For_Tovar_Nikita.create({
            img_path: filePath,
            img_name: fileName,
            tovarForWarehouseNikitumId:tovarForWarehouseNikitumId
        });

        return tovar_photo
    }

    async getOne(id){
        const tovar_photo = await Photo_For_Tovar_Nikita.findOne()
    }


}

module.exports = new PhotoService()