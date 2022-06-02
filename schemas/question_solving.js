const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        testLikesCount(id: ID!): Int!
        questionAnswer(questionId: Int!): Boolean
        testAnswers(testId: Int!): [AnswerSet]
    }

    type Mutation {
        contributeDifficulty(questionId: ID!, difficulty: Int!): NormalResponse
        likeTest(id: ID!): NormalResponse
        unlikeTest(id: ID!): NormalResponse
        submitAnswer(testId: Int!, questionId: Int!, answers:String!): NormalResponse
        judgeAnswer(testId: Int!, questionId: Int!): NormalResponse
        judgeAnswers(testId: Int!): NormalResponse
        createAsking(input: AskingInput!): NormalResponse
        deleteAsking(id: ID!): NormalResponse
    }
    
    input AskingInput {
        title: String!
        content: String!
        questionId: ID!
    }

    type AnswerSet {
        correctAnswer: [String]!
        myAnswer: String!
        is_correct: Boolean
    }

    type Asking {
        id: ID!
        title: String!
        content: String!
        ownerId: String!
        creationDate: Int!
        questionId: ID!
    }

    type ReviewNote {
        ownerId: String!
        testId: Int!
        questionID: Int!
        explanation: String
        reason: String
    }
`;