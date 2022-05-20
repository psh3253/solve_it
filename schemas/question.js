const {gql} = require('apollo-server');

export const typeDef = gql`
    extend type Query {
        questionMetaData: QuestionMetaData
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
        questionCategory: QuestionCategory
    }

    enum QuestionType {
        MULTIPLE_CHOICE
        FILL_BLANK
        SHORT_ANSWER
        CODING_TEST
    }

    enum QuestionCategory {
        ENGLISH
        TOEIC
        TOEFL
        MATH
        SCIENCE
        HANGUL
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
        questionCategory: QuestionCategory
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
        questionCategory: QuestionCategory
        candidates: [String!]!
    }
`