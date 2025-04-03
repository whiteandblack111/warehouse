const {Role} = require('../models/models');
const ApiError = require('../error/ApiError');
const role_Service = require('../services/role_Service')

class RoleController {
    async create(req, res) {
        const {name} = req.body
        const role = await role_Service.create(name)
        return res.json(role)
    }

    
    async getAll(req, res) {
        const roles = await Role.findAll()
        return res.json(roles)
        
    }


    async getOne(req, res) {
        
    }
}

module.exports = new RoleController()