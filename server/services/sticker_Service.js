
const { Sticker } = require('../models/models');


class Sticker_Service {

    async create(filePath, fileName, barcode, shop_name, tovar_id) {
        const sticker = await Sticker.create(
            {
                img_path: filePath,
                img_name: fileName,
                barcode: barcode,
                shop_name: shop_name,
                tovarForWarehouseId: tovar_id
            }
        )
        return sticker
    }


    async getOne(id) {
        const sticker = await Sticker.findOne({where: id })
        return sticker
    }

    async get_by_barcode(barcode) {
        const sticker = await Sticker.findOne({where: {barcode: barcode} })
        return sticker
    }


    async getAll() {

        const sticker = await Sticker.findAndCountAll(
            

        )
        return sticker
    }




}

module.exports = new Sticker_Service()