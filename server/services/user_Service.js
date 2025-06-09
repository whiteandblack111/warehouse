const { User, Role, Roles_User } = require('../models/models');
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const uuid = require('uuid');
const mailService = require('./mail_Service');
const tokenService = require('./token_Service');
const UserDTO = require('../dto/user_dto');
const ApiError = require("../error/ApiError");
const Role_Service = require("./role_Service");


class User_Service {

    async registration(firstname, twoname, email, password, roles = ["USER"], phone) {

        const candidate = await User.findOne({ where: { email: email } });

        if (candidate) {
            throw new Error(`Ошибка! Пользователь с почтовым адресом ${email}, уже существует!`)
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const newUser = await User.create({
            firstname,
            twoname,
            email,
            password: hashPassword,
            activationLink,
            phone
        });

        // перебрать полученные роли и установить их
        const setRoles = async () => {
            roles.map(async (role) => {
                const current_role = await Role_Service.getOne(role);
                await newUser.addRole(current_role)
            })
        }
        setRoles()


        const user = await User.findOne({
            where: { id: newUser.id },
            include: { all: true }
        })



        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);


        const userDto = new UserDTO(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }

    }

    async activate(activationLink) {

        const user = await User.findOne({ where: { activationLink: activationLink } });
        if (!user) {
            throw ApiError.bad_Request('Неккоректная ссылка активации');
        }
        if (user && user.isActivated === true) {
            throw ApiError.bad_Request('Даже не пытайся!!!))');
        }
        user.isActivated = true;
        await user.save();
    }

    async auto_activate(email) {

        const user = await User.findOne({ where: { email: email } });

        user.isActivated = true;

        await user.save();
    }



    async login(email, password) {

        const user = await User.findOne({
            where: { email: email },
            include: { all: true }
        });
        if (!user) {
            throw ApiError.bad_Request(`Введен не верный логин или пароль`);
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.bad_Request(`Введен не верный логин или пароль`);
        }

        if (user.isActivated !== true) {
            throw ApiError.bad_Request(`Акаунт не не активирован`);
        }

        const userDto = new UserDTO(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }

    }

    async logout(refreshToken) {

        const token = await tokenService.removeToken(refreshToken)

        return token;
    }

    async refresh(refreshToken) {

        if (!refreshToken) {
            throw ApiError.unauthorized_Request("Не передат токен для обновления")
        }

        const userData = tokenService.validateRefreshToken(refreshToken);

        const tokenFromDB = await tokenService.findToken(refreshToken);
        console.log("findToken userData:  ", userData)
        console.log("findToken tokenFromDB:  ", tokenFromDB)
        if (!userData || !tokenFromDB) {
            throw ApiError.unauthorized_Request();
        }

        const user = await User.findOne({
            where: { id: userData.id },
            include: [
                { model: Role, as: 'roles' }
            ]
        });
        const userDto = new UserDTO(user);

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }

    }

    async check_exist_registration_byEmail(email) {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return true
        }

        return false
    }

    async getOne_byEmail(email) {
        const user = await User.findOne(
            {
                where: { email: email },
                include: { all: true }
            });

        return user
    }


    async getAll() {
        const users = await User.findAll(
            {
                include: { all: true }
            });

        return users
    }

    async delete(id) {

        const candidate = await User.findOne({ where: { id: id } });
        console.log("candidate:  ", candidate);

        if (!candidate) {
            throw new Error(`Ошибка! Пользователь с почтовым адресом ${email}, НЕ существует!`)
        } else {
            await candidate.destroy({ where: { id: id } })

            return "Пользователь удалён НА ЙУХ"
        }

    }

}

module.exports = new User_Service()