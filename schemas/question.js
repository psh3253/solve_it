const {gql} = require('apollo-server');

module.exports = gql`
    enum Path {
        testId: ID!
        questionID: ID!
    }
    
    type Test {
        id: ID!
        questionIds: [ID!]!
        name: String!
        ownerId: String!
        tag: String!
        creationDate: Int!
        private: Boolean!
        tryCnt: Int!
        testCategory: Category!
    }

    type Record {
        id: ID!
        ownerID: String!
        startDate: Int!
        endDate: Int
        answers: [String!]!
        checks: [Boolean]!
        testId: Int!
    }

    interface Question {
        id: ID!
        name: String!
        paragraph: String!
        answers: [String!]!
        explanation: String
        type: QuestionType
        difficulty: Int!
        answerCnt: Int!
        wrongCnt: Int
        questionCategory: Category
    }

    enum QuestionType {
        MULTIPLE_CHOICE
        FILL_BLANK
        SHORT_ANSWER
        CODING_TEST
    }

    type Other implements Question {
        id: ID!
        name: String!
        paragraph: String!
        answers: [String!]!
        explanation: String
        type: QuestionType
        difficulty: Int!
        answerCnt: Int!
        wrongCnt: Int
        questionCategory: Category
    }

    type MultipleChoice {
        id: ID!
        name: String!
        paragraph: String!
        answers: [String!]!
        explanation: String
        type: QuestionType
        difficulty: Int!
        answerCnt: Int!
        wrongCnt: Int
        questionCategory: Category
        candidates: [String!]!
    }
`