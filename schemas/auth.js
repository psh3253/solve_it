const {gql} = require('apollo-server');

const authSchema = gql`
    type Query {
        login(id: String, password: String): User
    }
    type Mutation {
        register(id: String, password: String, nickname: String): Boolean
    }
    type User {
        id: String!
        nickname: String!
    }
`;

module.exports = authSchema;