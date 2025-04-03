const jwt = require('jsonwebtoken');
const { Task_Nikita, Tovar_For_Task_Nikita } = require('../models/models');


class Task_Nikita_Service {

    async create(taskData) {
        const task = await Task_Nikita.create(
            taskData
        )
        return task
    }

    async getOne_byId(id) {
        const task = await Task_Nikita.findOne({
            where: { id: id },

            include: [
                {
                    model: Tovar_For_Task_Nikita, as: "tovar_for_task_nikita"

                }
            ]

        })
        return task
    }

    async getOne_byNumber(task_number) {
        const task = await Task_Nikita.findOne({
            where: { task_number: task_number },

            include: [
                {
                    model: Tovar_For_Task_Nikita, as: "tovar_for_task_nikita"

                }
            ]

        })
        return task
    }


    async getAll(limit, offset) {

        const task = await Task_Nikita.findAndCountAll(
            {
                limit,
                offset,
                include: [
                    {
                        model: Tovar_For_Task_Nikita, as: "tovar_for_task_nikita"
    
                    }
                ]
            }
        )
        return task
    }

    async getAll_statusWork(statusWork, limit, offset) {

        const task = await Task_Nikita.findAndCountAll(
            {
                where: { statusWork: statusWork },
                limit,
                offset,
                include: [
                    {
                        model: Tovar_For_Task_Nikita, as: "tovar_for_task_nikita"
    
                    }
                ]
            }
        )
        return task
    }

    async getAll_executor(executor, limit, offset) {

        const task = await Task_Nikita.findAndCountAll(
            {
                where: { executor: executor },
                limit,
                offset,
                include: [
                    {
                        model: Tovar_For_Task_Nikita, as: "tovar_for_task_nikita"
    
                    }
                ]
            }
        )
        return task
    }

    async getAll_createAt(createAt, limit, offset) {

        const task = await Task_Nikita.findAndCountAll(
            {
                where: { createAt: createAt },
                limit,
                offset,
                include: [
                    {
                        model: Tovar_For_Task_Nikita, as: "tovar_for_task_nikita"
    
                    }
                ]
            }
        )
        return task
    }

}

module.exports = new Task_Nikita_Service()