const ApiError = require("../error/ApiError");
const UserService = require('../services/user_Service');
const Role_Service = require('../services/role_Service');


class automatic_Controller {

    async setStartUsers() {
        try {

            const formData = {
                firstname: "Evgeniy",
                twoname: "Freelancer",
                email: "ztavruz@yandex.ru",
                password: "123123",
                role: "SUPERADMIN"
            }

            const isUser = await UserService.check_exist_registration_byEmail(formData.email);
          
            if (!isUser) {
                const newUser = await UserService.registration(
                    formData.firstname,
                    formData.twoname,
                    formData.email,
                    formData.password,
                    formData.role,
                );
                const user = newUser.user
                await UserService.auto_activate(user.email);
                
                // return user
            }

 
            

        } catch (e) {
            ApiError.bad_Request(e.message);
        }
    }

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
}

module.exports = new automatic_Controller()