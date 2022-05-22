const {makeExecutableSchema} = require('@graphql-tools/schema')
const AuthSchema = require('./auth');
const AuthResolver = require('../resolvers/auth');
const ProfileSchema = require('./profile');
const ProfileResolver = require('../resolvers/profile');
const {gql} = require('apollo-server');

const Query = gql`
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
`;

const schema = makeExecutableSchema({
    typeDefs: [Query, AuthSchema, ProfileSchema],
    resolvers: [AuthResolver, ProfileResolver]
});

module.exports = schema;