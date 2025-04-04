
const { Tovar_For_Warehouse, Photo_For_Tovar, Tovar_For_Task } = require('../models/models');


class Tovar_Service {

    async create_for_warehouse(tovarData) {
        const tovar = await Tovar_For_Warehouse.create(tovarData)
        return tovar
    }

    async create_for_task(tovarData) {
        const tovar = await Tovar_For_Task.create(tovarData)
        return tovar
    }

    async update_quantity_tovar_for_task(formData) {
        const tovar = await Tovar_For_Task.update(
            { cartons_found: formData.cartons_found },
            { where: { id: formData.id } }
        )
        return tovar
    }



    async getOneFromWarehouseById(id) {
        const tovar = await Tovar_For_Warehouse.findOne({
            where: id,
            include: [
                { model: Photo_For_Tovar, as: 'photo_for_tovars' }
            ]

        })

        return tovar
    }

    async getOneFromWarehouseBybarcode(barcode) {
        const tovar = await Tovar_For_Warehouse.findOne({
            where: id,
            include: [
                {
                    model: Photo_For_Tovar,
                    as: 'photo_for_tovars',
                    where: { barcode: barcode }
                }
            ]

        })

        return tovar
    }

    async getAll() {
        const tovars = await Tovar_For_Warehouse.findAll(
            {
                include: [
                    {
                        model: Photo_For_Tovar,
                        as: 'photo_for_tovars',
                    }
                ]
            }
        )

        return tovars
    }

}

module.exports = new Tovar_Service()