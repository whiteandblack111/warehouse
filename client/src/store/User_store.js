import { makeAutoObservable } from "mobx";
import AuthService from "../services/Auth_Service";
import axios from "axios";
import { API_URL } from "../http";
import User_Service from "../services/User_Service";
import Task_Service from "../services/Task_Service";


export default class Store {
    _user = {};
    _isAuth = false;
    _isLoading = false;
    _isAdmin = false;
    _isWorker = false;
    _allWorkers = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAllWorkers(users) {
        this._allWorkers = users;
    }
    get allWorkers(){
        return this._allWorkers
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setIsAdmin(bool) {
        this._isAdmin = bool;
    }

    setIsWorker(bool) {
        this._isWorker = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setIsLoading(bool) {
        this._isLoading = bool;
    }

    get isAuth() {
        return this._isAuth;
    }

    get isAdmin() {
        return this._isAdmin;
    }

    get isLoading() {
        return this._isLoading;
    }

    get isWorker() {
        return this._isWorker;
    }

    get user() {
        return this._user;
    }

    async registration(email, password) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);


        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkIsAdmin(user) {
        const roles = user.roles
        await roles.map((role) => {
            if (role.name === "SUPERADMIN" || role.name === "ADMIN") {
                 this.setIsAdmin(true);
                 this.setIsWorker(false);
            }
        })
    }

    async checkIsWorker(user) {
        const roles = user.roles
        await roles.map((role) => {
            if (role.name === "WORKER") {
                 this.setIsWorker(true);
                 this.setIsAdmin(false);
            }
        })
    }

    async isReloadBrowser() {
        console.log("перезагрузка авторизации браузера")
        const token = localStorage.getItem('token');
        const response = await AuthService.isReloadBrowser(token);

    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);

            localStorage.setItem('token', response.data.accessToken);
            const user = response.data.user

            this.setIsAuth(true);
            this.setUser(user);
            this.checkIsAdmin(user);
            this.checkIsWorker(user);


        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setIsAuth(false);
            this.setUser({});
            this.setIsAdmin(false);

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }



    async checkAuth() {
        this.setIsLoading(true)
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, { withCredentials: true });

            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);

            console.log("response.data.user=====>>>", response.data.user)

            await response.data.user.roles.map((role) => {

                if (role.name === "SUPERADMIN" || role.name === "ADMIN") {
                    this.setIsAuth(true);
                    this.setIsAdmin(true)

                    return
                }
                if (role.name === "WORKER") {
                    this.setIsAuth(true);
                    this.setIsWorker(true)
                    return
                }
            })




        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false);
        }
    }

    async checkAuth() {
        this.setIsLoading(true)
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, { withCredentials: true });

            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);

            // console.log("response.data.user=====>>>", response.data.user)

            await response.data.user.roles.map((role) => {

                if (role.name === "SUPERADMIN" || role.name === "ADMIN") {
                    this.setIsAuth(true);
                    this.setIsAdmin(true)

                    return
                }
                if (role.name === "WORKER") {
                    this.setIsAuth(true);
                    this.setIsWorker(true)
                    return
                }
            })




        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false);
        }
    }

    async get_all_workers() {
        try {
            this.setIsLoading(true)
            const response = await User_Service.getUsers();

            const users = response.data
            let workers = []
            await users.map((user) => {
                user.roles.map((role) => {
                    if(role.name === "WORKER"){
                        workers.push(user)
                    }
                })
            })

            this.setAllWorkers(workers);
            this.setIsLoading(false);

        } catch (error) {

        }
    }

}