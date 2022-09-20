const {gql} = require('apollo-server');

module.exports = gql`
    type OnlineJudge {
        id: ID!
        name: String!
        paragraph: String!
        answers: [String!]!
        explanation: String
        type: QuestionType
        difficulty: Int!
        answerCnt: Int!
        wrongCnt: Int
        questionCategory: QuestionCategory
        testcases: [CodingTestCase!]!
    }

    type CodingTestCase {
        id: ID!
        input: String!
        output: [String!]!
    }
`;