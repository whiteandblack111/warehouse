const { type } = require('os');
const sequelize = require('../db');
const { DataTypes, INTEGER, Model } = require('sequelize');

const Role = sequelize.define(
    'role',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false }, // название файла и расширение
    },
    {
        timestamps: false
    }
)

const Roles_User = sequelize.define(
    'roles_user',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    
    },
    {
        createdAt:false,
        updatedAt:false
    }
)

const User = sequelize.define(
    'user',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        firstname: { type: DataTypes.STRING, defaultValue: "Не указано" },
        twoname: { type: DataTypes.STRING, defaultValue: "Не указано" },
        phone:{type: DataTypes.STRING, defaultValue: "Не указано"},  
        email: { type: DataTypes.STRING, allowNull: false, unique: true },  // для подтверждения регистрации 
        password: { type: DataTypes.STRING, allowNull: false },
        isActivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        activationLink: { type: DataTypes.STRING }
    }
)

Role.belongsToMany(User, { through: Roles_User })
User.belongsToMany(Role, { through: Roles_User })

const Photo_For_Tovar = sequelize.define(
    'photo_for_tovar',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        img_path: { type: DataTypes.STRING, allowNull: false },
        img_name: { type: DataTypes.STRING, allowNull: false },
        barcode: { type: DataTypes.STRING, allowNull: false },
    }
)


const Task = sequelize.define(
    'task',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        shop_name: { type: DataTypes.STRING, defaultValue: "не назначен" },
        task_number: { type: DataTypes.STRING, defaultValue: "не назначен"},
        marketplace_name: { type: DataTypes.STRING, allowNull: false },
        executor: { type: DataTypes.STRING, defaultValue: "не назначен" },
        statusWork: { type: DataTypes.STRING, defaultValue: "в очереди" },
        
    }
)
User.hasMany(Task)
Task.belongsTo(User)

const Tovar_For_Task = sequelize.define(
    'tovar_for_task',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        manufacturer_ID: { type: DataTypes.STRING },
        warehouse_ID: { type: DataTypes.STRING, allowNull: false },
        barcode: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },

        cartons_required: { type: DataTypes.STRING, allowNull: false },
        cartons_found: { type: DataTypes.STRING, defaultValue: 0 },
        additional_information: { type: DataTypes.STRING, },

        box_number: { type: DataTypes.STRING, defaultValue: "не определён" },
    }
)
Task.hasMany(Tovar_For_Task)
Tovar_For_Task.belongsTo(Task)


const Tovar_For_Warehouse = sequelize.define(
    'tovar_for_warehouse',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

        manufacturer_ID: { type: DataTypes.STRING, defaultValue: "не указан" },
        barcode: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.STRING, defaultValue: 0 },
    }
)

Tovar_For_Warehouse.hasMany(Photo_For_Tovar);
Photo_For_Tovar.belongsTo(Tovar_For_Warehouse)


const Photo_For_Box = sequelize.define(
    'photo_for_box',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        img_path: { type: DataTypes.STRING, allowNull: false },
        img_name: { type: DataTypes.STRING, allowNull: false },
        barcode: { type: DataTypes.STRING, allowNull: false },
    }
)

Tovar_For_Warehouse.hasMany(Photo_For_Box);
Photo_For_Box.belongsTo(Tovar_For_Warehouse)





module.exports = {
    User,
    Role,
    Roles_User,

    Photo_For_Tovar,
    Tovar_For_Warehouse,
    Task,
    Tovar_For_Task,

    Photo_For_Box


    // Task_Dima,
    // Tovar_For_Task_Dima,


}