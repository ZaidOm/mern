import {setInStorage, getFromStorage} from "./../../utils/storage";

class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cb) {
        this.authenticated = true;
        setInStorage("isAuthenticated", this.authenticated);
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        setInStorage("isAuthenticated", this.authenticated);
        cb();
    }

    isAuthenticated() {
        return getFromStorage("isAuthenticated");
    }
}

export default new Auth();