
const { TovarTask_statuses, BoxTask, Tovar_for_boxTask, Tovar_For_Task, Photo_For_Tovar, Sticker, Tovar_For_Warehouse } = require('../models/models');
const { update_quantity } = require('./tovar_forTask_Service');
const tovar_Service = require('./tovar_Service');


class BoxTask_Service {

    async addTovar_boxTask(formData) {
        console.log("addTovar_boxTask-=-=-=->", formData)

        // Поиск товара для поставки которому 
        // требуется изменить упакованное количенство 
        const tovar = await Tovar_For_Task.findOne({
            where: {
                id: formData.tovarForTaskId,

            }
        })

        console.log("BoxTask_Servicetovar-=-=-=->", tovar)

        // Проверяем что бы упакованное количество 
        // не превышало требуемое
        // 54 + (0 - 54)


        const setCartons_max = async () => {
            let result
            if (tovar.changed_cartons_required <= tovar.cartons_required
                &&
                tovar.changed_cartons_required !== 0) {

                result = tovar.changed_cartons_required
                console.log("cartons_max===> 1 ", result)
            }

            if (tovar.changed_cartons_required >= tovar.cartons_required) {
                result = tovar.changed_cartons_required
                console.log("cartons_max===> 2 ", result)
            }

            if (tovar.changed_cartons_required === 0) {
                result = tovar.cartons_required
                console.log("cartons_max===> 3 ", result)
            }

            return result
        }
        let cartons_max = await setCartons_max()


        let cartons_found = tovar.cartons_found + formData.quantityTovar

        // если не превышает
        if (cartons_found <= cartons_max) {
            // Указываем упакованное количество товара
            await tovar.update(
                {
                    cartons_found: cartons_found,
                }
            )
            // Проверяем существует ли уже этот короб
            let isBox_exist = await BoxTask.findOne({
                where: { id: formData.boxTaskId },
            })

            let boxTaskId = formData.boxTaskId
            let boxTask;


            // Если не существует
            if (!isBox_exist) {
                // Создаём новый короб и ложим в него часть товара
                boxTask = await BoxTask.create(formData);
                // и определяем его id
                boxTaskId = boxTask.id
            }

            // Если существует создаём часть товара 
            // и привязываем(ложим), в него
            await Tovar_for_boxTask.create(formData);

            // находим созданный короб
            boxTask = await BoxTask.findOne({
                where: { id: boxTaskId },
                include: [

                    {
                        model: Tovar_for_boxTask, as: "tovar_for_boxTasks"
                    }
                ],
                raw: true, // <----- HERE
                nest: true, // <----- HERE
            })

            // Проверка наличия статуса товара
            const isExist_status = await TovarTask_statuses.findOne({
                where: {
                    tovarForTaskId: tovar.id,
                    value: formData.status
                }
            })
            // Если статус отсутствует, то создаём его, 
            // если же он имеется то нет смысла его перезаписывать
            if (!isExist_status) {
                await TovarTask_statuses.create({
                    tovarForTaskId: tovar.id,
                    value: formData.status
                })
            }

            // Если количество товара в сборке дошло до максимума, 
            // уменьшаем количество товара на складе
            if (cartons_found === cartons_max) {

                const tovar_warehouse = await Tovar_For_Warehouse.findOne({
                    where: {id:tovar.tovarForWarehouseId}
                })

                const update_quantity = tovar_warehouse.quantity - cartons_found
                await tovar_warehouse.update(
                    { quantity: update_quantity }
                )
                await tovar_warehouse.save();
            }



            // Возвращаем созданный короб 
            // со всеми товарами которые к нему привязаны
            await tovar.save();
            return boxTask
        }

        // если превышает доступный остаток
        return {
            userError: {
                tovar: tovar,
                cartons_max: cartons_max,
                cartons_found: cartons_found,
                message: "Указанноен количество товара превышает доступный остаток в заказе"
            }
        }

    }

    async getAllBoxes_for_currentTask(taskId) {

        console.log("getAllBoxes_for_currentTask taskId ===>>> ", taskId)


        const boxes_for_task = await BoxTask.findAll({

            include: [
                {
                    model: Tovar_for_boxTask, as: "tovar_for_boxTasks",
                    include: [
                        {
                            model: Tovar_For_Task, as: "tovar_for_task",
                            include: [
                                {
                                    model: Tovar_For_Warehouse, as: "tovar_for_warehouse",
                                    include: [
                                        {
                                            model: Photo_For_Tovar, as: "photo_for_tovars",
                                            attributes: ['img_name'],
                                        }
                                    ]
                                },
                                {
                                    model: Sticker, as: "sticker",

                                }
                            ]
                        }
                    ]
                }
            ],
            where: { taskId: taskId }

        })

        console.log("boxTask.result===>>> ", boxes_for_task)
        return boxes_for_task
    }


    async getOne() {


    }

    async getAll() {

    }

}

module.exports = new BoxTask_Service()