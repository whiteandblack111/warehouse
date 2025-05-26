import { $api } from "../http/index.mjs";

// import { IUser } from "../models/response/IUser";

export default class User_Service {

    static getUsers() {
        return $api.get('/users');
        
    }

}