import $api from "../http/index";

export default class Tovar_Service {

    static async create_tovar_warehouse(formData) {
        return $api.post('/tovars/createtovarforwarehouse', formData);
        
    }

    static async getAll_tovars_warehouse() {
        return $api.get('/tovars/getall');
        
    }

    static async getOne_tovar_warehouse(id) {
        return $api.post('/tovars/getone', {id});
        
    }

    static async update_tovar_warehouse(formData) {
        return $api.post('/tovars/update', formData);
        
    }
    
    static async delete_tovar_warehouse(id){
        return $api.post('/tovars/delete', {id});
    }

}
