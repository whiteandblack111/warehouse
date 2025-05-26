const Router = require('express');
const router = new Router();
const tovar_Controller = require('../controllers/tovar_Controller')


router.post('/createtovarforwarehouse', tovar_Controller.create_tovar_for_warehouse);
router.post('/createtovarfortask', tovar_Controller.create_tovar_for_task);
router.post('/updatequantitytovarfortask', tovar_Controller.update_quantity_tovar_for_task);

router.get('/getall', tovar_Controller.getAll);
router.post('/getone', tovar_Controller.getOne);
router.post('/update', tovar_Controller.update);
router.post('/delete', tovar_Controller.delete_tovar_warehouse);

router.get('/:id', tovar_Controller.getOne);





module.exports = router