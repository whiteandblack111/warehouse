import $api from "../http/index.js";

// import { IUser } from "../models/response/IUser";

export default class User_Service {

    static getUsers() {
        return $api.get('/users');
        
    }

  

   

}