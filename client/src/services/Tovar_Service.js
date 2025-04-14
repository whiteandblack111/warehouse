import $api from "../http/index";

export default class Tovar_Service {

    static async create_tovar_warehouse(formData) {
        return $api.post('/tovars/createtovarforwarehouse', formData);
        
    }

    static async getAll_tovars_warehouse() {
        return $api.get('/tovars/getall');
        
    }


}
