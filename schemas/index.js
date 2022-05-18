const {makeExecutableSchema} = require('@graphql-tools/schema')
const AuthSchema = require('./auth');
const AuthResolver = require('../resolvers/auth');

const schema = makeExecutableSchema({
    typeDefs: [AuthSchema],
    resolvers: [AuthResolver]
});

module.exports = schema;
