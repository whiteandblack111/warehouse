const Router = require('express');
const router = new Router();
const user_Router = require('./user_Router');
const role_Router = require('./role_Router');
const tovar_nikita_Router = require('./tovar_nikita_Router');
const task_nikita_Router = require('./task_nikita_Router');
const task_dima_Router = require('./task_dima_Router');
const photo_Router = require('./photo_Router')

router.use('/users', user_Router);
router.use('/roles', role_Router);
router.use('/tovarnikita', tovar_nikita_Router);
router.use('/tasknikita', task_nikita_Router);
router.use('/taskdima', task_dima_Router);


router.use('/photo', photo_Router);


module.exports = router