const AuthService = require('../services/auth');

const authResolver = {
    Query: {
        login(parent, args, context, info) {
            return AuthService.login(args.ID, args.hashedPW);
        }
    },
    Mutation: {
        signup(parent, args, context, info) {
            return AuthService.signup(args.ID, args.hashedPW, args.name);
        }
    }
};

module.exports = authResolver;