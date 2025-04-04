const { Photo_For_Tovar } = require("../models/models");


class PhotoService {

    async create(filePath, fileName, barcode, tovarForWarehouseId ) {

        const tovar_photo = await Photo_For_Tovar.create({
            img_path: filePath,
            img_name: fileName,
            barcode: barcode,
            tovarForWarehouseId:tovarForWarehouseId
        }); 

        return tovar_photo
    }

    async getOne(id){
        const tovar_photo = await Photo_For_Tovar.findOne()
    }


}

module.exports = new PhotoService()