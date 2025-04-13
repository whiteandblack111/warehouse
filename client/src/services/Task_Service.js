import $api from "../http";

export default class Task_Service {

    static async create_task(taskData) {
        return $api.post('/tasks/create', taskData);
        
    }

    static async get_one(id) {
        return $api.post('/tasks/getone/', {id});
        
    }

    static async set_executor(task_id, worker_id) {
        return $api.post('/tasks/setexecutor/', {task_id, worker_id});
        
    }


    static async getall_tasks() {
        return $api.get('/tasks/getall');
        
    }

}
