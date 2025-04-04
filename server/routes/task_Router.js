const Router = require('express');
const router = new Router();
const task_Controller = require('../controllers/task_Controller')



router.post('/create', task_Controller.create);

router.get('/getone', task_Controller.getOne);

router.get('/getall', task_Controller.getAll);

router.get('/:id', task_Controller.getOne);





module.exports = router