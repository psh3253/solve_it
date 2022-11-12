const AuthService = require('../services/auth');
const {normalResponse} = require('../util');

const authResolver = {
    Query: {
        login(parent, {ID, hashedPW}, context, info) {
            return AuthService.login(ID, hashedPW);
        }
    },
    Mutation: {
        signup(parent, {ID, hashedPW, name}, context, info) {
            return normalResponse(200, 'hello', AuthService.signup(ID, hashedPW, name));
        }
    }
};

module.exports = authResolver;