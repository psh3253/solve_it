const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        testLikesCount(id: ID!): Int!
        judgeResult(questionId: Int!): Boolean
    }

    type Mutation {
        contributeDifficulty(questionId: ID!, difficultyId: ID!): NormalResponse
        likeTest(id: ID!): NormalResponse
        unlikeTest(id: ID!): NormalResponse
        submitAnswer(testId: Int!, questionId: Int!, answers:String!): NormalResponse
        judgeAnswer(testId: Int!, questionId: Int!): NormalResponse
    }

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