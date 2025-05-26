const Router = require('express');
const router = new Router();
const tovar_forTask_Controller = require('./../controllers/tovar_forTask_Controller')


router.post('/update', tovar_forTask_Controller.update_tovar_forTask);

router.post('/addfortask', tovar_forTask_Controller.add_tovar_forTask);

router.post('/delete', tovar_forTask_Controller.deleteTovar_fromTask);




// router.get('/getallfortask', tovar_forTask_Controller.getAll_forTask);
// router.get('/getall', tovar_forTask_Controller.getAll);
// router.get('/:id', tovar_forTask_Controller.getOne);


module.exports = router