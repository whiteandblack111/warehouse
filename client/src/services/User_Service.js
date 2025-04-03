import $api from "../http";

import { IUser } from "../models/response/IUser";

export default class User_Service {

    static getUsers() {
        return $api.get('/users');
        
    }

  

   

}