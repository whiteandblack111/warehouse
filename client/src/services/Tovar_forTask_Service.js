import { $api } from "../http/index.mjs";

export default class Task_Service {

    static async update_tovar_forTask(taskData) {
        return $api.post('/tovarsfortask/update', taskData);
        
    }

    static async add_tovar_forTask(taskData) {
        return $api.post('/tovarsfortask/addfortask', taskData);
        
    }

    static async getone(id) {
        return $api.post('/tovarsfortask/getetone/', {id});
        
    }

    static async getAll() {
        return $api.post('/tovarsfortask/getall');
        
    }

    static async deleteTovar_fromTask(fomData){
        return $api.post('/tovarsfortask/delete', fomData);
    }

}
