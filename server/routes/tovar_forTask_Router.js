const Router = require('express');
const router = new Router();
const tovar_forTask_Controller = require('./../controllers/tovar_forTask_Controller')


router.post('/update', tovar_forTask_Controller.update_tovar_forTask);

router.get('/getallfortask', tovar_forTask_Controller.getAll_forTask);

router.get('/getall', tovar_forTask_Controller.getAll);

router.get('/:id', tovar_forTask_Controller.getOne);





module.exports = router