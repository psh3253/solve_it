const AuthService = require('../services/auth');

const authResolver = {
    Query: {
        login(parent, args, context, info) {
            return AuthService.login(args.id, args.password);
        }
    },
    Mutation: {
        register(parent, args, context, info) {
            return AuthService.register(args.id, args.password, args.nickname);
        }
    }
};

module.exports = authResolver;