
const { Sticker } = require('../models/models');


class Sticker_Service {

    async create(formData) {
        const sticker = await Sticker.create(
            formData
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