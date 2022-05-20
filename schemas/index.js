const {makeExecutableSchema} = require('@graphql-tools/schema')
const AuthSchema = require('./auth');
const AuthResolver = require('../resolvers/auth');
const { gql } = require('apollo-server');

const Query = gql`
    enum Path {
        testId: ID!
        questionID: ID!
    }
    interface Response {
        code: Int!
        message: String!
        success: Boolean!
    }
    type NormalResponse {
        code: Int!
        message: String!
        success: Boolean!
    }
    scalar Upload
    type File {
        url: String!
    }
`

const schema = makeExecutableSchema({
    typeDefs: [AuthSchema, Query],
    resolvers: [AuthResolver]
});

module.exports = schema;