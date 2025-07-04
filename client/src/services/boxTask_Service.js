import { $api } from "../http/index.mjs";

export default class Task_Service {


    static async addTovars_boxTask(formData) {
        return $api.post('/boxtask/addtovars', formData);
        
    }

    static async getAllBoxes_for_currentTask(taskId) {
        return $api.post('/boxtask/getallboxes_for_currenttask', {taskId});
        
    }

    static async getone(id) {
        return $api.post('/boxtask/getetone/', {id});
        
    }

    

}
