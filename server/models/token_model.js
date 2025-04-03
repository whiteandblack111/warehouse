const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const {User} = require('./models')

const Token = sequelize.define(
    'token', 
    {
        isActivated: {type: DataTypes.BOOLEAN, allowNull:false, defaultValue:false},
        refreshToken: {type: DataTypes.TEXT, allowNull:false}
    }
)

// for User
User.hasOne(Token);
Token.belongsTo(User);

module.exports = {
    Token
}