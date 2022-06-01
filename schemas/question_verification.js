const {gql} = require('apollo-server');

module.exports = gql`
    type Report {
        id: ID!
        reported: String!
        creationDate: Int!
        reason: String!
    }
`;