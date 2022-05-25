const {makeExecutableSchema} = require('@graphql-tools/schema')
const AuthSchema = require('./auth');
const AuthResolver = require('../resolvers/auth');
const ProfileSchema = require('./profile');
const ProfileResolver = require('../resolvers/profile');
const QuestionSchema = require('./question');
const QuestionResolver = require('../resolvers/question');
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
    type CreationQuestionResponse {
        code: Int!
        message: String!
        success: Boolean!
        questionId: Int!
    }
    scalar Upload
    type File {
        url: String!
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [Query, AuthSchema, ProfileSchema, QuestionSchema],
    resolvers: [AuthResolver, ProfileResolver, QuestionResolver]
});

module.exports = schema;