const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        testLikesCount(id: ID!): Int!
        questionAnswer(questionId: Int!): Boolean
        testAnswers(testId: Int!): [AnswerSet]
        askingByQuestion(id: ID!): [Asking!]!
        repliesByAsking(id: ID!): [Reply!]!
        mySolvingTests: [TestHeader!]!
    }

    type Mutation {
        contributeDifficulty(questionId: ID!, difficulty: Int!): NormalResponse
        likeTest(id: ID!): NormalResponse
        unlikeTest(id: ID!): NormalResponse
        submitAnswer(testId: Int!, questionId: Int!, answers:String!): NormalResponse
        judgeAnswer(testId: Int!, questionId: Int!): NormalResponse
        judgeAnswers(testId: Int!): NormalResponse
        createAsking(input: CreateAskingInput!): NormalResponse
        deleteAsking(id: ID!): NormalResponse
        createReply(input: CreateReplyInput!): NormalResponse
        deleteReply(id: ID!): NormalResponse
    }

    input CreateAskingInput {
        title: String!
        content: String!
        questionId: ID!
    }

    type AnswerSet {
        questionId: ID!
        correctAnswer: [String]!
        myAnswer: String!
        is_correct: Boolean
    }

    input CreateReplyInput {
        content: String!
        askingId: ID!
    }

    type Asking {
        id: ID!
        title: String!
        content: String!
        ownerId: String!
        creationDate: String!
        questionId: ID!
    }

    type Reply {
        id: ID!
        content: String!,
        ownerId: String!,
        creationDate: String!
        askingId: ID!
    }
`;