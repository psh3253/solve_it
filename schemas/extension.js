const {gql} = require('apollo-server');

module.exports = gql`
    type Extension {
        id: ID!
        name: String!
        description: String!
        codes: [String!]!
        creationDate: Int!
        creatorId: String!
    }
`;