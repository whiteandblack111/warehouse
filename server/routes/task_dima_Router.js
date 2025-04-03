const Router = require('express');
const router = new Router();
const Task_Dima_Controller = require('../controllers/task_dima_Controller')



router.post('/create', Task_Dima_Controller.create);

router.get('/getAll', Task_Dima_Controller.getAll);

router.get('/:id', Task_Dima_Controller.getOne);





module.exports = router