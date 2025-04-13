




class User_controller {

    static check_user_role(role_value_forcheck, user) {

        user.roles.map((role) => {
            if (role_value_forcheck === role) {
                console.log("Роль юзера ===> ", role)
                return true
            }
        })

        return false
    }

}



export default User_controller