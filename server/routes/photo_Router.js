const Router = require('express');
const router = new Router();
const photo_Controller = require('../controllers/photo_Controller')



router.post('/createfortovar', photo_Controller.create_foto_for_tovar);

router.get('/getAll', photo_Controller.getAll);

router.get('/:id');





module.exports = router