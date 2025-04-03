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
        // phone:{type: DataTypes.STRING, allowNull:false, unique: true},  
        email: { type: DataTypes.STRING, allowNull: false, unique: true },  // для подтверждения регистрации 
        password: { type: DataTypes.STRING, allowNull: false },
        isActivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        activationLink: { type: DataTypes.STRING }
    }
)

Role.belongsToMany(User, { through: Roles_User })
User.belongsToMany(Role, { through: Roles_User })

const Photo_For_Tovar_Nikita = sequelize.define(
    'photo_for_tovar_nikita',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        img_path: { type: DataTypes.STRING, allowNull: false },
        img_name: { type: DataTypes.STRING, allowNull: false },
    }
)

const Task_Nikita = sequelize.define(
    'task_nikita',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        shop_name: { type: DataTypes.STRING, defaultValue: "не назначен" },
        task_number: { type: DataTypes.STRING, defaultValue: "не назначен"},
        marketplace_name: { type: DataTypes.STRING, allowNull: false },
        executor: { type: DataTypes.STRING, defaultValue: "не назначен" },
        statusWork: { type: DataTypes.STRING, defaultValue: "в очереди" },


    }
)
const Tovar_For_Task_Nikita = sequelize.define(
    'tovar_for_task_nikita',
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
Task_Nikita.hasMany(Tovar_For_Task_Nikita)
Tovar_For_Task_Nikita.belongsTo(Task_Nikita)

Tovar_For_Task_Nikita.hasMany(Photo_For_Tovar_Nikita)
Photo_For_Tovar_Nikita.belongsTo(Tovar_For_Task_Nikita)

const Tovar_For_Warehouse_Nikita = sequelize.define(
    'tovar_for_warehouse_nikita',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        manufacturer_ID: { type: DataTypes.STRING, defaultValue: "не указан" },
        warehouse_ID: { type: DataTypes.STRING, allowNull: false },
        barcode: { type: DataTypes.STRING, unique: true, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.STRING, defaultValue: 0 },
    }
)

Tovar_For_Warehouse_Nikita.hasMany(Photo_For_Tovar_Nikita);
Photo_For_Tovar_Nikita.belongsTo(Tovar_For_Warehouse_Nikita)



// const Task_Dima = sequelize.define(
//     'task_dima', 
//     {
//         id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
//         name:{type: DataTypes.STRING, unique: true, allowNull:false}, // название файла и расширение
//     }
// )
// const Tovar_For_Task_Dima = sequelize.define(
//     'tovar_for_task_dima', 
//     {
//         id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
//         manufacturer_ID:{type: DataTypes.STRING},
//         warehouse_ID:{type: DataTypes.STRING, allowNull:false}, 
//         barcode:{type: DataTypes.STRING, allowNull:false}, 
//         name:{type: DataTypes.STRING, allowNull:false}, 

//         cartons_required:{type: DataTypes.STRING, allowNull:false}, 
//         cartons_found:{type: DataTypes.STRING, allowNull:false},
//         additional_information:{type: DataTypes.STRING,},


//         box_number:{type: DataTypes.STRING, allowNull:false},
//         task_nikita_id:{type: DataTypes.INTEGER,},
//     }
// )
// Task_Dima.hasMany(Tovar_For_Task_Dima)
// Tovar_For_Task_Dima.belongsTo(Task_Dima)

// Photo_For_Tovar.hasMany(Tovar_For_Task_Dima)
// Tovar_For_Task_Dima.belongsTo(Photo_For_Tovar)




module.exports = {
    User,
    Role,
    Roles_User,

    Photo_For_Tovar_Nikita,
    Tovar_For_Warehouse_Nikita,
    Task_Nikita,
    Tovar_For_Task_Nikita,


    // Task_Dima,
    // Tovar_For_Task_Dima,


}