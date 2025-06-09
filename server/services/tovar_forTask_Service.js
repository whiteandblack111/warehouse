
const { Tovar_For_Warehouse, Photo_For_Tovar, Tovar_For_Task, Sticker, TovarTask_statuses } = require('../models/models');


class Tovar_forTask_Service {

    async create(formdata) {


        const tovar = await Tovar_For_Task.create(formdata);

        // Проверка наличия статуса данного товара
        const isExist_status = await TovarTask_statuses.findOne({
            where: {
                tovarForTaskId: tovar.id,
                value: formdata.status
            }
        })

        // Если статус отсутствует, то создаём его, 
        // если же он имеется то нет смысла его перезаписывать
        if (!isExist_status) {
            console.log("Статус для товара ещё не существует, создаю")
            await TovarTask_statuses.create({
                tovarForTaskId: tovar.id,
                value: formdata.status
            })
        }


        console.log("Tovar_For_Task.create;;;; ", formdata)
        return tovar
    }




    async update_quantity(formdata) {
        console.log("formdata;;;; ", formdata)

        // Поиск товара для поставки 
        // которому требуется изменить количенство 
        const tovar = await Tovar_For_Task.findOne({
            where: { id: formdata.tovar_task_id }
        })

        // Указываем изменённое количество товара
        await tovar.update(
            {
                changed_cartons_required: formdata.changed_cartons_required,
            }
        )

        // Проверка наличия статуса об изменении данного товара
        const isExist_status = await TovarTask_statuses.findOne({
            where: {
                tovarForTaskId: formdata.tovar_task_id,
                value: formdata.status
            }
        })

        // Если статус отсутствует, то создаём его, 
        // если же он имеется то нет смысла его перезаписывать
        if (!isExist_status) {
            console.log("Статус изменения для товара ещё не существует, создаю")
            await TovarTask_statuses.create({
                tovarForTaskId: formdata.tovar_task_id,
                value: formdata.status
            })
        }

        if (isExist_status) {
            console.log("Статус изменения для товара существует, вот он -=-=-=->>> ", isExist_status)
        }




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

        // Поиск товара требуемый для удаления из списка поставки
        const tovar_task = await Tovar_For_Task.findOne({
            where: { id: formdata.tovar_task_id }
        });

        // Проверка наличия статуса о ПРИКАЗЕ к удалению этого товара
        const isExist_status = await TovarTask_statuses.findOne({
            where: {
                tovarForTaskId: formdata.tovar_task_id,
                value: formdata.new_status_for_tovar
            }
        })


        //Если запрос идёт от админа
        if (formdata.role === "ADMIN") {

            // Если статус приказа на удаление отсутствует, 
            // создаём его
            if (!isExist_status) {
                await TovarTask_statuses.create({
                    tovarForTaskId: formdata.tovar_task_id,
                    value: formdata.new_status_for_tovar
                })
            }


            await tovar_task.save();
            return tovar_task
        }

        //Если запрос идёт от работника
        if (formdata.role === "WORKER") {
            console.log("запрос идёт от работника")

            // Если статус приказа на удаление товара имеется, 
            if (isExist_status) {
                console.log("статус приказа на удаление товара имеется")

                //Возвращаем упакованное количество товара на склад
                const tovar_warehouse = await Tovar_For_Warehouse.findOne({
                    where: { id: tovar_task.tovarForWarehouseId }
                })
                const restored_quantity = tovar_warehouse.quantity + tovar_task.cartons_found
                await tovar_warehouse.update(
                    {
                        quantity: restored_quantity
                    }
                )
                await tovar_warehouse.save()

                //Удаляем товар
                const result = await Tovar_For_Task.destroy({
                    where: { id: formdata.tovar_task_id }
                })

                
                return result
            }
            console.log("статус приказа на удаление товара ОТСУТСТВУЕТ")
        }


    }

    async getById(id) {
        const tovar_task = await Tovar_For_Task.findOne({
            where: { id: id }
        });
        return tovar_task
    }



}

module.exports = new Tovar_forTask_Service()