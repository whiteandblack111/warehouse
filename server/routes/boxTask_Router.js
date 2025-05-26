const Router = require('express');
const router = new Router();
const BoxTask_Controller = require('./../controllers/boxTask_Controller')


router.post('/addtovars', BoxTask_Controller.addTovar_boxTask);
router.post('/getallboxes_for_currenttask', BoxTask_Controller.getAllBoxes_for_currentTask);




module.exports = router