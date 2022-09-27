const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        testLikesCount(id: ID!): Int!
        questionAnswer(questionId: ID!): Boolean
        testAnswers(testId: ID!): [AnswerSet]
        asking(askingId: ID!): Asking
        askingByQuestion(id: ID!): [Asking!]!
        repliesByAsking(id: ID!): [Reply!]!
        allAsking(page: Int!): [Asking]
        mySolvingTests: [TestHeader!]!
    }

    type Mutation {
        contributeDifficulty(questionId: ID!, difficulty: Int!): NormalResponse
        likeTest(id: ID!): NormalResponse
        unlikeTest(id: ID!): NormalResponse
        submitAnswer(testId: ID!, questionId: ID!, answers:String!): NormalResponse
        judgeAnswer(testId: ID!, questionId: ID!): NormalResponse
        judgeAnswers(testId: ID!): NormalResponse
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