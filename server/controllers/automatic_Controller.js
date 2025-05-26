const ApiError = require("../error/ApiError");
const UserService = require('../services/user_Service');
const Role_Service = require('../services/role_Service');


class automatic_Controller {

    async setStartRoles() {
        try {
            const startRoles = {
                role1: "SUPERADMIN",
                role2: "ADMIN",
                role3: "WORKER",
                role4: "USER",
            }
            let isRole;

            for (let role of Object.values(startRoles)) {
                isRole = await Role_Service.check_exist_role_byName(role);
                if (!isRole) {
                    await Role_Service.create(role);
                }
            }

        } catch (e) {

        }
    }

    async setStartUsers() {
        try {

            let formData = {
                firstname: "Евгений",
                twoname: "Freelancer",
                email: "ztavruz@yandex.ru",
                password: "123123",
                role: "SUPERADMIN"
            }

            let isUser = await UserService.check_exist_registration_byEmail(formData.email);
            let newUser;
            let user

            if (!isUser) {
                newUser = await UserService.registration(
                    formData.firstname,
                    formData.twoname,
                    formData.email,
                    formData.password,
                    formData.role,
                );
                 user = newUser.user
                await UserService.auto_activate(user.email);

            }


            formData = {
                firstname: "Висдом",
                twoname: "Worker",
                email: "worker1@yandex.ru",
                password: "321321",
                role: "WORKER"
            }
            isUser = await UserService.check_exist_registration_byEmail(formData.email);
            if (!isUser) {
                newUser = await UserService.registration(
                    formData.firstname,
                    formData.twoname,
                    formData.email,
                    formData.password,
                    formData.role,
                );
                user = newUser.user
                await UserService.auto_activate(user.email);

            }

            
            formData = {
                firstname: "Шавкат",
                twoname: "Worker",
                email: "worker2@yandex.ru",
                password: "123123",
                role: "WORKER"
            }
            isUser = await UserService.check_exist_registration_byEmail(formData.email);
            if (!isUser) {
                newUser = await UserService.registration(
                    formData.firstname,
                    formData.twoname,
                    formData.email,
                    formData.password,
                    formData.role,
                );
                user = newUser.user
                await UserService.auto_activate(user.email);

            }

            formData = {
                firstname: "Hикита",
                twoname: "Admin",
                email: "admin1@yandex.ru",
                password: "123123",
                role: "ADMIN"
            }
            isUser = await UserService.check_exist_registration_byEmail(formData.email);
            if (!isUser) {
                newUser = await UserService.registration(
                    formData.firstname,
                    formData.twoname,
                    formData.email,
                    formData.password,
                    formData.role,
                );
                user = newUser.user
                await UserService.auto_activate(user.email);
            }

            formData = {
                firstname: "Дима",
                twoname: "Admin",
                email: "admin2@yandex.ru",
                password: "123123",
                role: "ADMIN"
            }

            isUser = await UserService.check_exist_registration_byEmail(formData.email);
            if (!isUser) {
                newUser = await UserService.registration(
                    formData.firstname,
                    formData.twoname,
                    formData.email,
                    formData.password,
                    formData.role,
                );
                user = newUser.user
                await UserService.auto_activate(user.email);

            }



        } catch (e) {
            ApiError.bad_Request(e.message);
        }
    }
}

module.exports = new automatic_Controller()