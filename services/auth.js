const authService = {};
const User = require("../models/user");

authService.login = async function login(id, password) {
    try{
        return await User.findOne({
            attributes: ['id', 'nickname'],
            where: {
                id: id,
                password: password
            }
        });
    }catch (e) {
        console.error(e);
    }
}

authService.register = async function register(id, password, nickname) {
    try {
        await User.create({
            id: id,
            password: password,
            nickname: nickname
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = authService;