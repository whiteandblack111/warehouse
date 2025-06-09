const jwt = require('jsonwebtoken');
const { Role } = require('../models/models');

const { where } = require('sequelize');


class Role_Service {

    async create(name) {
        console.log()
        const role = await Role.create({name})
        return role
    }

    async getOne(name) {
        const role = await Role.findOne(
            {where: {name:name}}
        )
        return role
    }


    async check_exist_role_byName(name) {
        const role = await Role.findOne({ where: { name: name } });
        if (role) {
            return true
        }
        
        return false
    }

}

module.exports = new Role_Service()