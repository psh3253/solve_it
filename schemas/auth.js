const {gql} = require('apollo-server');

const authSchema = gql`
    type Query {
        login(ID: String!, hashedPW: String!): String
    }
    type Mutation {
        signup(ID: String!, hashedPW: String!, name: String!): Boolean
    }
`;

module.exports = authSchema;