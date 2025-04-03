const Router = require('express');
const router = new Router();
const role_Controller = require('../controllers/role_Controller')



router.post('/create', role_Controller.create);

router.get('/all', role_Controller.getAll);

router.get('/:id', role_Controller.getOne);





module.exports = router