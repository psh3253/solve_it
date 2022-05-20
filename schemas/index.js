const {makeExecutableSchema} = require('@graphql-tools/schema')
const AuthSchema = require('./auth');
const AuthResolver = require('../resolvers/auth');
const { gql } = require('apollo-server');

const schema = makeExecutableSchema({
    typeDefs: [AuthSchema],
    resolvers: [AuthResolver]
});

module.exports = schema;