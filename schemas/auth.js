const {gql} = require('apollo-server');

export const typeDef = gql`
    type Query {
        login(ID: String!, hashedPW: String!): String
    }
    type Mutation {
        signup(ID: String!, hashedPW: String!, name: String!): Boolean
        test: Question
    }
`;