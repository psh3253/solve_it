const AuthService = require('../services/auth');

const authResolver = {
    Query: {
        login(parent, {ID, hashedPW}, context, info) {
            return AuthService.login(ID, hashedPW);
        }
    },
    Mutation: {
        signup(parent, {ID, hashedPW, name}, context, info) {
            console.log(ID)
            return {
                code: 200,
                message: 'hello',
                success: AuthService.signup(ID, hashedPW, name)
            };
        }
    }
};

module.exports = authResolver;