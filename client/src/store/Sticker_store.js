import { makeAutoObservable } from "mobx";
import Sticker_Service from "../services/Sticker_Service";


export default class Sticker_store {

    _sticker = [];
    _isCreate = false;
    _isSearch = false;
    _allStickers = [];


    constructor() {
        makeAutoObservable(this);
    }

    setSticker(sticker) {
        this._sticker = sticker;
    }
    get Sticker() {
        return this._sticker;
    }

    setAllStickers(stickers) {
        this._allStickers = stickers;
    }
    get allStickers() {
        return this._allStickers;
    }

    
    get isCreate() {
        return this._isCreate;
    }
    setIsCreate(bool) {
        this._isCreate = bool;
    }

    setIsSearch(bool) {
        this._isSearch = bool;
    }
    get isSearch() {
        return this._isSearch;
    }

    async create(stickerData) {
        try {

            const response = await Sticker_Service.create(stickerData);

            const sticker = response.data
            this.setSticker(sticker);

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }


    async getall() {
        try {
            const response = await Sticker_Service.getall();
            this.setAllStickers(response.data);

            console.log(response.data)

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }



}