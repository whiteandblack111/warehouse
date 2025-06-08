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
        createdAt: false,
        updatedAt: false
    }
)

const User = sequelize.define(
    'users',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        firstname: { type: DataTypes.STRING, defaultValue: "Не указано" },
        twoname: { type: DataTypes.STRING, defaultValue: "Не указано" },
        phone: { type: DataTypes.STRING, defaultValue: "Не указано" },
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
        changed_cartons_required: { type: DataTypes.INTEGER, defaultValue: 0 }

    }
)

const TovarTask_statuses = sequelize.define(
    'tovarTask_statuses',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        value: { type: DataTypes.STRING, defaultValue: "default" },

    }
)

const BoxTask = sequelize.define(
    'boxTask',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        taskId: { type: DataTypes.INTEGER, defaultValue: 0 },
        numberBox_inTask: { type: DataTypes.INTEGER, allowNull: false },
    
    }
)



const Tovar_for_boxTask = sequelize.define(
    'tovar_for_boxTask',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        boxTaskId: { type: DataTypes.INTEGER, defaultValue: 0 },
        taskId: { type: DataTypes.INTEGER, defaultValue: 0 },
        quantityTovar: { type: DataTypes.INTEGER, defaultValue: 0 },


        // так же имееются поля ===> 
        // tovarForTaskId: { type: DataTypes.INTEGER, defaultValue: 0 },
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
        reserve: { type: DataTypes.INTEGER, defaultValue: 0 },
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


// +
// В поставку могут входить многие товары для поставки
Task.hasMany(Tovar_For_Task, {onDelete: "cascade"});
Tovar_For_Task.belongsTo(Task);

// +
// Из данных товаров склада, формируются товары входящие в поставку
// соответственно многие товары из поставки могут относиться 
// к одному из товаров склада
Tovar_For_Warehouse.hasMany(Tovar_For_Task);
Tovar_For_Task.belongsTo(Tovar_For_Warehouse);

// +
// Товар на складе может иметь несколько стикеров 
// для разных магазинов-заказчиков
Tovar_For_Warehouse.hasMany(Sticker, {onDelete: "cascade"});
Sticker.belongsTo(Tovar_For_Warehouse);

// +
// Товары в таске могут быть одинаковыми в следствие их 
// повторного добавления при необходимости
// соответственно и стикера у них будут одинаковы 
// соответственно один стикер может принадлежать ко многим(одинаковым) товарам одной поставки
Sticker.hasMany(Tovar_For_Task)
Tovar_For_Task.belongsTo(Sticker);


// +
// Множество фото товара может принадлежать одному из товаров
Tovar_For_Warehouse.hasMany(Photo_For_Tovar, {onDelete: "cascade"});
Photo_For_Tovar.belongsTo(Tovar_For_Warehouse)

// +
// Фото коробов товаров в отдельной таблице, для их получения после фото самого товара
// Множество фото КОРОБА товара может принадлежать одному из товаров
Tovar_For_Warehouse.hasMany(Photo_For_Box, {onDelete: "cascade"});
Photo_For_Box.belongsTo(Tovar_For_Warehouse)

// Здесь короб с часть одного из товаров конкретной поставки
// может содержать несколько разных товаров поставки при условии их малого количества
// для полного заполнения короба если это разрешено
BoxTask.hasMany(Tovar_for_boxTask);

// К товару поставки могут относиться многие части этого самого товара
// то есть один товар паставки может быть упакован в несколько коробов
Tovar_For_Task.hasMany(Tovar_for_boxTask, {onDelete: "cascade"});
Tovar_for_boxTask.belongsTo(Tovar_For_Task)

// Товар поставки может иметь множество статусов
Tovar_For_Task.hasMany(TovarTask_statuses, {onDelete: "cascade"});
TovarTask_statuses.belongsTo(Tovar_For_Task)


// - вообще не фак
// Photo_For_Box.belongsTo(Tovar_for_boxTask)

// ===============================БАЗА - начало===========================

// // У поставки - много товаров для поставки
// Task.hasMany(Tovar_For_Task);
// // Tovar_For_Task.belongsTo(Task);

// Tovar_For_Warehouse.hasMany(Tovar_For_Task);
// Tovar_For_Task.belongsTo(Tovar_For_Warehouse);

// Tovar_For_Warehouse.hasMany(Sticker);
// // Sticker.belongsTo(Tovar_For_Warehouse);

// Sticker.hasMany(Tovar_For_Task)
// Tovar_For_Task.belongsTo(Sticker);

// Photo_For_Tovar.belongsTo(Tovar_For_Warehouse);
// Photo_For_Box.belongsTo(Tovar_For_Warehouse)

// Tovar_For_Warehouse.hasMany(Photo_For_Box);
// Tovar_For_Warehouse.hasMany(Photo_For_Tovar);

// BoxTask.hasMany(Tovar_for_boxTask);

// Tovar_For_Task.hasMany(Tovar_for_boxTask);
// Tovar_for_boxTask.belongsTo(Tovar_For_Task)

// Photo_For_Box.belongsTo(Tovar_for_boxTask)

// ===============================БАЗА - конец===========================




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
    Sticker,
    TovarTask_statuses


}