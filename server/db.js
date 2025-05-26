const { Sequelize } = require('sequelize');

let config = require('./config/config.json');


// const config_main = {
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
// }

const sequelize = new Sequelize(config)

async function recreateDatabase() {
  try {
    await sequelize.drop();
    await sequelize.sync({ force: true });
    console.log('База данных пересоздана');
  } catch (error) {
    console.error('Ошибка при пересоздании базы данных:', error);
  }
}

// recreateDatabase();

module.exports = sequelize