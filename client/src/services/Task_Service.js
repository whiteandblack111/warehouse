import $api from "../http";

export default class Task_Service {

    static async create_task(taskData) {
        return $api.post('/tasks/create', taskData);
        
    }

    static async getone(id) {
        return $api.post('/tasks/getetone/', {id});
        
    }

    static async getall_tasks() {
        return $api.get('/tasks/getall');
        
    }

}
