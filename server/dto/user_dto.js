module.exports = class UserDTO {
    id;
    email;
    isActivated;
    roles;
    firstname;

    constructor(model){
        this.firstname = model.firstname;
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.roles = model.roles;
    }
}