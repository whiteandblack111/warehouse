const jwt = require('jsonwebtoken');
const { Tovar_For_Task_Dima, Tovar_For_Warehouse_Nikita, Photo_For_Tovar_Nikita, Tovar_For_Task_Nikita } = require('../models/models');


class Tovar_Nikita_Service {

    async create_for_warehouse(tovarData) {
        const tovar = await Tovar_For_Warehouse_Nikita.create(tovarData)
        return tovar
    }

    async create_for_task(tovarData) {
        const tovar = await Tovar_For_Task_Nikita.create(tovarData)
        return tovar
    }

    async update_quantity_tovar_for_task(formData) {
        const tovar = await Tovar_For_Task_Nikita.update(
            {cartons_found: formData.cartons_found},
            {where: { id: formData.id }}
        )
        return tovar
    }
    


    async getOneFromWarehouseById(id){
        const tovar = await Tovar_For_Warehouse_Nikita.findOne({
            where: id,
            include: [
                {model:Photo_For_Tovar_Nikita, as: 'photo_for_tovar_nikita'}
            ]

        })

        return tovar
    }

    async getOneFromWarehouseBybarcode(barcode){
        const tovar = await Tovar_For_Warehouse_Nikita.findOne({
            where: id,
            include: [
                {
                    model:Photo_For_Tovar_Nikita, 
                    as: 'photo_for_tovar_nikita', 
                    where: {barcode: barcode}}
            ]

        })

        return tovar
    }

}

module.exports = new Tovar_Nikita_Service()