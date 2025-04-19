
const { Tovar_For_Warehouse, Photo_For_Tovar, Tovar_For_Task, Sticker } = require('../models/models');


class Tovar_forTask_Service {

    async create(tovarData) {
        const tovar = await Tovar_For_Task.create(tovarData)
        return tovar
    }

    async update_quantity(formdata) {
        console.log("formdata;;;; ", formdata)
        const tovar = await Tovar_For_Task.findOne({
            where: { id: formdata.tovar_task_id }
        })
        await tovar.update(
            {
                cartons_required: formdata.quantity,
                status: "changed"
            }
        )
        return tovar
    }

    async update_box_number(formdata) {
        console.log("formdata;;;; ", formdata)
        const tovar = await Tovar_For_Task.findOne({
            where: { id: formdata.tovar_task_id }
        })
        await tovar.update(
            {
                quantityBoxes: formdata.quantityBoxes,
                status: "done"
            }
        )
        return tovar
    }

    async stopReason(formdata) {
        console.log("formdata;;;; ", formdata)
        const tovar = await Tovar_For_Task.findOne({
            where: { id: formdata.tovar_task_id }
        })
        await tovar.update(
            {
                stopReason: formdata.stopReason,
                status: "stop"
            }
        )
        return tovar
    }






    async getOne() {


    }

    async getAll() {

    }

}

module.exports = new Tovar_forTask_Service()