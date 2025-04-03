const Router = require('express');
const router = new Router();
const Task_Nikita_Controller = require('../controllers/task_nikita_Controller')



router.post('/create', Task_Nikita_Controller.create);

router.get('/getone', Task_Nikita_Controller.getOne);

router.get('/getall', Task_Nikita_Controller.getAll);

router.get('/:id', Task_Nikita_Controller.getOne);





module.exports = router