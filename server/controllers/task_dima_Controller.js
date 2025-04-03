const {Task_Nikita} = require('../models/models');
const ApiError = require('../error/ApiError');

class Task_Dima_Controller {
    async create(req, res) {
        const {name} = req.body
        const type = await Task_Nikita.create({name})
        return res.json(type)
    }

    
    async getAll(req, res) {
        
    }


    async getOne(req, res) {
        
    }
}

module.exports = new Task_Dima_Controller()