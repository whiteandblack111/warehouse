const Router = require('express');
const router = new Router();
const user_Router = require('./user_Router');
const role_Router = require('./role_Router');
const tovar_Router = require('./tovar_Router');
const tovar_forTask_Router = require('./tovar_forTask_Router');
const task_Router = require('./task_Router');
const photo_Router = require('./photo_Router')
const sticker_Router = require('./sticker_Router')
const boxTask_Router = require('./boxTask_Router')

router.use('/users', user_Router);
router.use('/roles', role_Router);
router.use('/tovars', tovar_Router);
router.use('/tovarsfortask', tovar_forTask_Router);
router.use('/tasks', task_Router);
router.use('/stickers', sticker_Router);
router.use('/boxtask', boxTask_Router);


router.use('/photo', photo_Router);


module.exports = router