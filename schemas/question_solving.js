const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        testLikesCount(id: ID!): Int!
    }

    type Mutation {
        contributeDifficulty(questionId: ID!, difficultyId: ID!): NormalResponse
        likeTest(id: ID!): NormalResponse
        unlikeTest(id: ID!): NormalResponse
        submitAnswer(id: ID!, answers:[String!]): NormalResponse
    }

    type Asking {
        id: ID!
        title: String!
        content: String!
        ownerId: String!
        creationDate: Int!
        testId: ID!
    }

    type ReviewNote {
        ownerId: String!
        testId: Int!
        questionID: Int!
        explanation: String
        reason: String
    }
`;