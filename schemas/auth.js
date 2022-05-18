const {gql} = require('apollo-server');

const authSchema = gql`
    type Query {
        login(ID: String!, hashedPW: String!): String
    }
    type Mutation {
        signup(ID: String!, hashedPW: String!, name: String!): NormalResponse
    }
    
    interface Response {
        code: Int!
        success: Boolean!
        message: String!
    }
    type NormalResponse {
        code: Int!
        success: Boolean!
        message: String!
    }
`;

module.exports = authSchema;