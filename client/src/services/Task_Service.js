import $api from "../http";

export default class Task_Service {

    static async create_task(taskData) {
        return $api.post('/create/tascks', taskData);
        
    }

    static async getone(id) {
        return $api.post('/tascks/getetone/', {id});
        
    }

    static async getall_tasks() {
        return $api.post('/tascks/getall');
        
    }

}
