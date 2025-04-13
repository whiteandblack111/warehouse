import $api from "../http/index";

export default class Task_Service {

    static async update_tovar_forTask(taskData) {
        return $api.post('/tovarsfortask/update', taskData);
        
    }

    static async getone(id) {
        return $api.post('/tovarsfortask/getetone/', {id});
        
    }

    static async getAll() {
        return $api.post('/tovarsfortask/getall');
        
    }

}
