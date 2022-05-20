const {gql} = require('apollo-server');

module.exports = gql`
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

    type Query {
        login(ID: String!, hashedPW: String!): String
    }
    type Mutation {
        signup(ID: String!, hashedPW: String!, name: String!): Boolean
    }
`;