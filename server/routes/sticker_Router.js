const Router = require('express');
const router = new Router();
const sticker_Controller = require('../controllers/sticker_Controller')



router.post('/create', sticker_Controller.create);

router.get('/getone', sticker_Controller.getOne);

router.get('/getall', sticker_Controller.getAll);

router.get('/:id', sticker_Controller.getOne);





module.exports = router