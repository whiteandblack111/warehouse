const ApiError = require('./../error/ApiError');
const token_Service = require('./../services/token_Service');
const role_Service = require('./../services/role_Service');

module.exports = function (role) {
    return function (req, res, next) {
        try {
            const autorizationHeader = req.headers.authorization;
            if (!autorizationHeader) {
                return next(ApiError.unauthorized_Request("Не получен заголовок авторизации!"));
            }

            const accessToken = autorizationHeader.split(' ')[1];
            if (!accessToken) {
                return next(ApiError.unauthorized_Request("Не получен токен авторизации!"));
            }

            const userData = token_Service.validateAccessToken(accessToken);
            if(userData.role !== role){
                
            }

            if (!userData) {
                return next(ApiError.unauthorized_Request("Токен авторизации не валиден!"));
            }

            req.user = userData;
            next();

        } catch (e) {
            return next(ApiError.unauthorized_Request());
        }
    }
}