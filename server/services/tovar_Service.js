
const { Tovar_For_Warehouse, Photo_For_Tovar, Tovar_For_Task, Sticker } = require('../models/models');


class Tovar_Service {

    async create_for_warehouse(formData) {
        const tovar = await Tovar_For_Warehouse.create(formData)
        return tovar
    }

    async create_for_task(formData) {
        const tovar = await Tovar_For_Task.create(formData)
        return tovar
    }

    async update_quantity_tovar_for_task(formData) {
        const tovar = await Tovar_For_Task.update(
            { cartons_found: formData.cartons_found },
            { where: { id: formData.id } }
        )
        return tovar
    }

    async update_quantity_tovar_for_warehouse(formData) {
        console.log("update_quantity_tovar_for_warehouse+++++++>>>>>>> ", formData)
        const tovar = await Tovar_For_Warehouse.findOne(
            { where: { id: formData.id } }
        )
        await tovar.update(
            { quantity: formData.quantity }
        )
        await tovar.save();
        return tovar

       
    }


    async getOneFromWarehouseById(id) {
        console.log("getOneFromWarehouseById+++++++>>>>>>> ", id)
        const tovar = await Tovar_For_Warehouse.findOne({
            where: { id: id },
            include: [
                { model: Photo_For_Tovar, as: 'photo_for_tovars' },
                { model: Sticker, as: 'stickers' }
            ]

        })

        console.log("tovar+++++++>>>>>>> ", tovar)
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
                    { model: Photo_For_Tovar, as: 'photo_for_tovars' },
                    { model: Sticker, as: 'stickers' }
                ]
            }
        )

        return tovars
    }

    async delete_tovar_warehouse(id){
        const result = await Tovar_For_Warehouse.destroy({
            where:{id:id}
        })

        return result
    }

}

module.exports = new Tovar_Service()