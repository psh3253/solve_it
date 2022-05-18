const jsonwebtoken = require('jsonwebtoken');
const authService = {};
const User = require("../models/user");
require('dotenv').config();

authService.login = async function login(id, password) {
    try{
        const user = await User.findOne({
            attributes: ['id', 'nickname'],
            where: {
                id: id,
                password: password
            }
        });
        if(user != null)
        {
            return jsonwebtoken.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: '1800s'});
        }
        return null;
    }catch (e) {
        console.error(e);
    }
}

authService.signup = async function signup(id, password, nickname) {
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