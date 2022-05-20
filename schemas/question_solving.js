const {gql} = require('apollo-server');

module.exports = gql`
    type Asking {
        id: ID!
        title: String!
        content: String!
        ownerId: String!
        creationDate: Int!
        testId: ID!
    }

    enum OrderBy {
        DATE
        DATE_DESC
        LIKE
        LIKE_DESC
        SOLVING_COUNT
        SOLVING_COUNT_DESC
    }

    type ReviewNote {
        ownerId: String!
        testId: Int!
        questionID: Int!
        explanation: String
        reason: String
    }
`;