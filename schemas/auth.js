const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        login(ID: String!, hashedPW: String!): String
    }
    type Mutation {
        signup(ID: String!, hashedPW: String!, name: String!): NormalResponse
    }
`;