const Router = require('express');
const router = new Router();
const tovar_nikita_Controller = require('../controllers/tovar_nikita_Controller')



// router.post('/create', tovar_nikita_Controller.create);

router.post('/createtovarforwarehouse', tovar_nikita_Controller.create_tovar_for_warehouse);
router.post('/createtovarfortask', tovar_nikita_Controller.create_tovar_for_task);
router.post('/updatequantitytovarfortask', tovar_nikita_Controller.update_quantity_tovar_for_task);

router.get('/getAll', tovar_nikita_Controller.getAll);

router.get('/:id', tovar_nikita_Controller.getOne);





module.exports = router