module.exports = class UserDTO {
    id;
    email;
    isActivated;
    roles;

    constructor(model){
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.roles = model.roles;
    }
}