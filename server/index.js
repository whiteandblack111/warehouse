require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const automatic_Controller = require('./controllers/automatic_Controller');


const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        origin: [process.env.CLIENT_URL, process.env.СLIENT_URL_DEPLOY, "http://skynetbot.ru" , "https://skynetbot.ru"]
    }
));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'files')));
app.use(fileUpload({}))
app.use('/api', router);


// вроде норм
// обработчик ошибок(errorHandler регистрируется последним в списке app.use)
app.use(errorHandler)

const start = async () => {
    try {

        await sequelize.authenticate()
        await sequelize.sync()
        
        console.log("Установка начальных зависимостей начата")
        await automatic_Controller.setStartRoles();
        await automatic_Controller.setStartUsers();
        console.log("Установка начальных зависимостей окончена")

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);

        })
    } catch (e) {
        console.log(e)
    }
}

start();