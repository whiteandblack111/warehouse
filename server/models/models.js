const { type } = require('os');
const sequelize = require('../db');
const { DataTypes, INTEGER, Model } = require('sequelize');

const Role = sequelize.define(
    'roles',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false }, // название файла и расширение
    },
    {
        timestamps: false
    }
)


const Roles_User = sequelize.define(
    'roles_users',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
        createdAt:false,
        updatedAt:false
    }
)

const User = sequelize.define(
    'users',
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


const Photo_For_Tovar = sequelize.define(
    'photo_for_tovars',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        img_path: { type: DataTypes.STRING, allowNull: false },
        img_name: { type: DataTypes.STRING, allowNull: false },
    }
)


const Task = sequelize.define(
    'tasks',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        task_name: { type: DataTypes.STRING, allowNull: false },
        shop_name: { type: DataTypes.STRING, allowNull: false },
        executor: { type: DataTypes.STRING, defaultValue: "не назначен" },
        statusWork: { type: DataTypes.STRING, defaultValue: "в очереди" },
        start_build: { type: DataTypes.STRING, defaultValue: "12.04.2025" },
        end_build: { type: DataTypes.STRING, defaultValue: "15.04.2025" },
        
    }
)
const Tovar_For_Task = sequelize.define(
    'tovar_for_tasks',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        warehouse_ID: { type: DataTypes.STRING, allowNull: false },
        barcode: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        
        cartons_required: { type: DataTypes.INTEGER, allowNull: false },
        cartons_found: { type: DataTypes.INTEGER, defaultValue: 0 },
        // additional_information: { type: DataTypes.STRING, },
        stopReason: { type: DataTypes.STRING, defaultValue: "no" },
        status: { type: DataTypes.STRING, defaultValue: "default" },
        changed_cartons_required:{type: DataTypes.INTEGER, defaultValue: 0},
        completion_status:{type: DataTypes.STRING, defaultValue: "default"}
     
    }
)

const BoxTask = sequelize.define(
    'boxTask',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        taskId: { type: DataTypes.INTEGER, defaultValue: 0 },
    }
)



const Tovar_for_boxTask = sequelize.define(
    'tovar_for_boxTask',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        boxTaskId: { type: DataTypes.INTEGER, defaultValue: 0 },
        taskId: { type: DataTypes.INTEGER, defaultValue: 0 },
        tovarForTaskId: { type: DataTypes.INTEGER, defaultValue: 0 },
        quantityTovar:{ type: DataTypes.INTEGER, defaultValue: 0 },
    }
)



const Sticker = sequelize.define(
    "stickers",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        img_path: { type: DataTypes.STRING, allowNull: false },
        img_name: { type: DataTypes.STRING, allowNull: false },
        barcode: { type: DataTypes.STRING, allowNull: false },
        shop_name: { type: DataTypes.STRING, allowNull: false },
        warehouse_ID: { type: DataTypes.STRING, allowNull: false },
        
    }
)



const Tovar_For_Warehouse = sequelize.define(
    'tovar_for_warehouses',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        manufacturer_ID: { type: DataTypes.STRING, defaultValue: "не указан" },
        name: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
        garbage: { type: DataTypes.INTEGER, defaultValue: 0 },
        reserve: {type: DataTypes.INTEGER, defaultValue: 0 },
    }
)



const Photo_For_Box = sequelize.define(
    'photo_for_boxes',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        img_path: { type: DataTypes.STRING, allowNull: false },
        img_name: { type: DataTypes.STRING, allowNull: false },
        barcode: { type: DataTypes.STRING, allowNull: false },
    }
)

Role.belongsToMany(User, { through: Roles_User })
User.belongsToMany(Role, { through: Roles_User })

User.hasMany(Task)
Task.belongsTo(User)

Task.hasMany(Tovar_For_Task);
// Tovar_For_Task.belongsTo(Task);

Tovar_For_Warehouse.hasMany(Tovar_For_Task);
Tovar_For_Task.belongsTo(Tovar_For_Warehouse);

Tovar_For_Warehouse.hasMany(Sticker);
// Sticker.belongsTo(Tovar_For_Warehouse);

Sticker.hasMany(Tovar_For_Task)
Tovar_For_Task.belongsTo(Sticker);

Photo_For_Tovar.belongsTo(Tovar_For_Warehouse);
Photo_For_Box.belongsTo(Tovar_For_Warehouse)

Tovar_For_Warehouse.hasMany(Photo_For_Box);
Tovar_For_Warehouse.hasMany(Photo_For_Tovar);

BoxTask.hasMany(Tovar_for_boxTask);
// Tovar_for_boxTask.hasOne(Tovar_For_Task);


module.exports = {
    User,
    Role,
    Roles_User,

    Photo_For_Tovar,
    Tovar_For_Warehouse,
    Task,
    Tovar_For_Task,
    BoxTask,
    Tovar_for_boxTask,

    Photo_For_Box,
    Sticker


}