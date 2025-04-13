const uuid = require('uuid');

const ApiError = require("../error/ApiError");
const { createPath, uploadFile } = require('../services/FotoUploader');
const UserService = require('../services/user_Service');
const {validationResult} = require('express-validator');


class User_Controller {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.bad_Request('Ошибка валидации', errors.array()))
            }

            const { firstname, twoname, email, password, phone } = req.body;

            const userData = await UserService.registration(firstname, twoname, email, password, phone);
            console.log("userData:  ", userData)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);

        } catch (e) {
            next(ApiError.bad_Request(e.message));
        }

    }

    async activate(req, res, next) {
        try {

            const activationLink = req.params.link
            await UserService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);

        } catch (e) {
            next(ApiError.bad_Request(e.message));
        }

    }

    async login(req, res, next) {
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.bad_Request('Ошибка валидации', errors.array()))
            }

            const {email, password } = req.body;
            
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(ApiError.bad_Request(e.message));
        }

    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(ApiError.bad_Request(e.message));
        }

    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log("refreshToken:  ", refreshToken)

            const userData = await UserService.refresh(refreshToken);
            
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(ApiError.unauthorized_Request(e.message));
        }

    }


    async getAll(req, res, next) {
        try {
            const userData = await UserService.getAll();

            return res.json(userData);
        } catch (e) {
            next(ApiError.bad_Request(e.message))
        }


    }
    


    async getOne(req, res, next) {
        try {
            const { id } = req.query

            return res.json(true)

        } catch (e) {
            return next(ApiError.bad_Request(e.message))
        }

    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.query

            const userData = await UserService.delete(id);

            return res.json(userData)

        } catch (e) {
            return next(ApiError.bad_Request(e.message))
        }

    }
}

module.exports = new User_Controller()