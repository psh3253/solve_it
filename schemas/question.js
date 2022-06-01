const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        question(id: ID!): Question
        test(id: ID!): Test
        allTests(page: Int!, order: OrderBy): [TestHeader!]!
        testsByCategory(id: ID!): [TestHeader!]!
        testsByCreator(id: ID!): [TestHeader!]!
    }

    type Mutation {
        createQuestion(input: createQuestionInput): CreationQuestionResponse
        updateQuestion(input: updateQuestionInput): CreationQuestionResponse
        deleteQuestion(id: ID!): NormalResponse
        createTest(input: createTestInput): NormalResponse
        updateTest(input: updateTestInput): NormalResponse
        deleteTest(id: ID!): NormalResponse
    }

    enum OrderBy {
        DATE
        DATE_DESC
        LIKE
        LIKE_DESC
        SOLVING_COUNT
        SOLVING_COUNT_DESC
    }

    input createQuestionInput {
        name: String!,
        paragraph: String!,
        answers: [String!]!,
        explanation: String,
        type: QuestionType!,
        questionCategory: Int!,
        questionDifficulty: Int!,
        candidates: [String!]
    }
    
    input updateQuestionInput {
        id: Int!,
        name: String!,
        paragraph: String!,
        answers: [String!]!,
        explanation: String,
        type: QuestionType!,
        candidates: [String!]
    }

    input createTestInput {
        name: String!
        content: String!
        private: Boolean!
        questionIds: [Int!]!
        categoryId: Int!
    }
    
    input updateTestInput {
        id: ID!
        name: String!
        content: String!
        private: Boolean!
        questionIds: [Int!]!
        categoryId: Int!
    }

    type Path {
        testId: ID!
        questionID: ID!
    }

    type Test {
        id: ID!
        questionIds: [QuestionIdNumber!]!
        name: String!
        content: String!
        ownerId: String!
        tag: [String!]
        creationDate: String!
        private: Boolean!
        tryCnt: Int!
        like: Int!
        testCategory: Category!
    }
    
    type TestHeader {
        id: ID!
        name: String!
        ownerId: String!
        creationDate: String!
        private: Boolean!
        tryCnt: Int!
        like: Int!
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
        difficulty: Difficulty!
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
        difficulty: Difficulty!
        answerCnt: Int!
        wrongCnt: Int
        questionCategory: Category!
    }

    type MultipleChoice implements Question {
        id: ID!
        name: String!
        paragraph: String!
        answers: [String!]!
        explanation: String
        type: QuestionType
        difficulty: Difficulty!
        answerCnt: Int!
        wrongCnt: Int
        questionCategory: Category
        candidates: [Candidate!]!
    }

    type Candidate {
        number: Int!
        content: String!
    }

    type Difficulty {
        id: ID!
        name: String!
    }
    
    type QuestionIdNumber {
        questionId: ID!
        number: Int!
    }
`