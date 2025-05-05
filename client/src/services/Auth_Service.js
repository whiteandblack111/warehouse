import $api from "../http/index.mjs";

export default class AuthService {

    static async login(email, password) {
        return $api.post('/api/users/login', {email, password});
        
    }


    static async registration(email, password) {
        return $api.post('/api/users/registration', {email, password});
        
    }

    static async logout() {
        return $api.post('/api/users/logout');
        
    }

}
