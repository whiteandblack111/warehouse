import { $api } from "../http/index.mjs";

export default class Sticker_Service {

    static async create(objectData) {
        return $api.post('/stickers/create', objectData);
        
    }

    static async getone(id) {
        return $api.post('/stickers/getone', {id});
        
    }

    static async getall() {
        return $api.post('/stickers/getall');
        
    }

}
