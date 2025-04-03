import $api from "../http";

export default class Task_Nikita_Service {

    static async create({...taskObject}) {
        return $api.post('/tasknikita/create', {...taskObject});
        
    }

    static async getone(id) {
        return $api.post('/tasknikita/getone', {id});
        
    }

    static async getall() {
        return $api.post('/tasknikita/getall');
        
    }

}
