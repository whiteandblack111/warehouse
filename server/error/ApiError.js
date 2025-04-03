class ApiError extends Error{
    constructor(status, message, errors = []) {
        super();
        this.status = status
        this.message = message
        this.errors = errors
    }

    static unauthorized_Request(message = "Пользователь не авторизован"){
        return new ApiError(401, message)
    } 

    static bad_Request(message, errors = []){
        return new ApiError(404, message, errors)
    }

    static internal_Request(message){
        return new ApiError(500, message)
    }

    static forbiden_Request(message){
        return new ApiError(403, message)
    }
}

module.exports = ApiError