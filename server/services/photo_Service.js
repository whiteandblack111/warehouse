const { Photo_For_Tovar } = require("../models/models");


class Photo_Service {

    async create(filePath, fileName, tovarForWarehouseId ) {
        const tovar_photo = await Photo_For_Tovar.create({
            img_path: filePath,
            img_name: fileName,
            tovarForWarehouseId:tovarForWarehouseId
        }); 

        return tovar_photo
    }

    async getOne(id){
        const tovar_photo = await Photo_For_Tovar.findOne()
    }


}

module.exports = new Photo_Service()