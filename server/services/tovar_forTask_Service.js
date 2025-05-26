
const { Tovar_For_Warehouse, Photo_For_Tovar, Tovar_For_Task, Sticker } = require('../models/models');


class Tovar_forTask_Service {

    async create(tovarData) {
        const tovar = await Tovar_For_Task.create(tovarData)
        console.log("Tovar_For_Task.create;;;; ", formdata)
        return tovar
    }

    async update_quantity(formdata) {
        console.log("formdata;;;; ", formdata)
        const tovar = await Tovar_For_Task.findOne({
            where: { id: formdata.tovar_task_id }
        })
        await tovar.update(
            {
                changed_cartons_required: formdata.changed_cartons_required,
                status: formdata.status
            }
        )
        await tovar.save();
        return tovar
    }


    // async update_boxesQuantity(formdata) {
    //     console.log("formdata;;;; ", formdata)

    //     const tovar_task = await Tovar_For_Task.findOne({
    //         where: { id: formdata.tovar_task_id },
    //     })


    //     const tovar_warehouse = await Tovar_For_Warehouse.findOne({
    //         where: { id: formdata.tovarForWarehouseId }
    //     })

    //     if (tovar_task.status !== "done") {
    //         let quantity = tovar_warehouse.quantity - formdata.quantityTovar
    //         let reserve = tovar_warehouse.reserve + formdata.quantityTovar

    //         await tovar_warehouse.update(
    //             {
    //                 quantity: quantity,
    //                 reserve: reserve
    //             }
    //         )
    //         await tovar_warehouse.save();
    //     }


    //     await tovar_task.update(
    //         {
    //             quantityBoxes: formdata.quantityBoxes,
    //             status: "done"
    //         }
    //     )
    //     await tovar_task.save();

    //     const result_tovar_task = await Tovar_For_Task.findOne({
    //         where: { id: formdata.tovar_task_id },
    //         include: [
    //             {
    //                 model: Sticker, as: "sticker",
    //             },
    //             {
    //                 model: Tovar_For_Warehouse, as: "tovar_for_warehouse",
    //                 include: [
    //                     { model: Photo_For_Tovar, as: 'photo_for_tovars' }
    //                 ]
    //             },
    //         ]
    //     })

    //     return result_tovar_task
    // }

    async stopReason(formdata) {
        console.log("formdata;;;; ", formdata)

        let tovar_task
        tovar_task = await Tovar_For_Task.findOne({
            where: { id: formdata.tovar_task_id },
        })


        const tovar_warehouse = await Tovar_For_Warehouse.findOne({
            where: { id: formdata.tovarForWarehouseId }
        })

        let quantity = 0;
        let reserve = 0;

        // В случае если товар уже был упакован в поставку
        if (tovar_task.status === "done") {
            quantity = tovar_warehouse.quantity + formdata.quantityTovar
            reserve = tovar_warehouse.reserve - formdata.quantityTovar

            await tovar_warehouse.update(
                {
                    quantity: quantity,
                    reserve: reserve
                }
            )
            await tovar_warehouse.save();
        }

        await tovar_task.update(
            {
                stopReason: formdata.stopReason,
                status: "stop"
            }
        )
        await tovar_task.save();



        const result_tovar_task = await Tovar_For_Task.findOne({
            where: { id: formdata.tovar_task_id },
            include: [
                {
                    model: Sticker, as: "sticker",
                },
                {
                    model: Tovar_For_Warehouse, as: "tovar_for_warehouse",
                    include: [
                        { model: Photo_For_Tovar, as: 'photo_for_tovars' }
                    ]
                },
            ]
        })

        return result_tovar_task
    }

    async deleteTovar_fromTask(formdata) {

      
        console.log("Tovar_forTask_Service formdata.tovar_task_id====> ", formdata.tovar_task_id)
        const tovar_task = await Tovar_For_Task.findOne({
            where:{id: formdata.tovar_task_id}
        });

        if (formdata.role === "ADMIN") {
            await tovar_task.update(
                {
                    status: formdata.new_status_for_tovar
                }
            )
            await tovar_task.save();
            return tovar_task
        }

        if (formdata.role === "WORKER") {
            const result = await Tovar_For_Task.destroy({
                where: { id: formdata.tovar_task_id }
            })
            return result
        }


    }



}

module.exports = new Tovar_forTask_Service()