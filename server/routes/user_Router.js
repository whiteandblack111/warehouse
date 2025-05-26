const Router = require('express');
const router = new Router();
const user_Controller = require('../controllers/user_Controller');
const { body } = require('express-validator');
const auth_Middleware = require('./../middleware/auth-middleware');


router.post(
    '/registration',
    body('email').isEmail(),
    body('password').optional().isLength({ min: 6, max: 32 }),
    body('firstname').optional().isLength({ min: 3, max: 32 }),
    body('twoname').optional().isLength({ min: 3, max: 32 }),
    user_Controller.registration
);

router.get('/activate/:link', user_Controller.activate);

router.post('/login',
    body('email').isEmail(),
    body('password').optional().isLength({ min: 6, max: 32 }),
    user_Controller.login);

router.post('/logout', user_Controller.logout);

router.get('/refresh', user_Controller.refresh);

router.get('/', auth_Middleware, user_Controller.getAll);

router.get('/:id', auth_Middleware, user_Controller.getOne);

router.get('/delete/:id', auth_Middleware, user_Controller.deleteOne);





module.exports = router