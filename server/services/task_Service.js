
const { where } = require('sequelize');
const { model, models } = require('../db');
const { Task, Tovar_For_Task, Sticker, TovarTask_statuses, User, Tovar_For_Warehouse, Photo_For_Tovar } = require('../models/models');


class Task_Service {

    async create(taskData) {
        const task = await Task.create(
            taskData
        )
        return task
    }

    async getOne(id) {

        let task = await Task.findOne({
            where: { id: id },
            include: [

                {
                    model: User, as: "user"
                }
            ],
            raw: true, // <----- HERE
            nest: true, // <----- HERE
        })

        task.tovar_for_tasks = []

        let tovars_for_task = await Tovar_For_Task.findAll({
            where: { taskId: task.id },
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
                {
                    model: TovarTask_statuses, as: "tovarTask_statuses",
                },
            ]

        })

        await task.tovar_for_tasks.push(tovars_for_task)

        if (task.tovar_for_tasks.length !== 0) {
            return task
        }

    }


    async set_executor(task_id, worker_id) {
        const task = await Task.findOne({
            where: { id: task_id },
            include: { all: true }
        })

        const user = await User.findOne({
            where: { id: worker_id }
        })
        console.log("getOne_byId+++====++++====> ", task)

        await task.update(
            {
                executor: user.firstname,

            }
        )


        return task
    }

    async getOne_byNumber(task_number) {
        const task = await Task.findOne({
            where: { task_number: task_number },

            include: [
                {
                    model: Tovar_For_Task, as: "tovar_for_tasks"

                },
                {
                    model: TovarTask_statuses, as: "tovarTask_statuses",
                },
            ]

        })
        return task
    }


    async getAll(limit, offset) {


        const tasks = await Task.findAndCountAll(
            {
                limit,
                offset,
                include: [
                    {
                        model: Tovar_For_Task, as: "tovar_for_tasks",
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
                            {
                                model: TovarTask_statuses, as: "tovarTask_statuses",
                            },
                        ]

                    },
                    {
                        model: User, as: "user"
                    }
                ]
            }
        )




        return tasks
    }

    async getAll_statusWork(statusWork, limit, offset) {

        const task = await Task.findAndCountAll(
            {
                where: { statusWork: statusWork },
                limit,
                offset,
                include: [
                    {
                        model: Tovar_For_Task, as: "tovar_for_task"

                    },
                    {
                        model: TovarTask_statuses, as: "tovarTask_statuses",
                    },
                ]
            }
        )





        return task
    }

    async getAll_executor(executor, limit, offset) {

        const task = await Task.findAndCountAll(
            {
                where: { executor: executor },
                limit,
                offset,
                include: [
                    {
                        model: Tovar_For_Task, as: "tovar_for_task"

                    }
                ]
            }
        )
        return task
    }

    async getAll_createAt(createAt, limit, offset) {

        const task = await Task.findAndCountAll(
            {
                where: { createAt: createAt },
                limit,
                offset,
                include: [
                    {
                        model: Tovar_For_Task, as: "tovar_for_task"

                    }
                ]
            }
        )
        return task
    }

}

module.exports = new Task_Service()