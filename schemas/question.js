const {gql} = require('apollo-server');

export const typeDef = gql`
    extend type Query {
        questionMetaData: QuestionMetaData
    }

    type QuestionMetaData {
        typeList: [String!]!
        categoryList: [String!]!
    }

    interface Question {
        id: ID!
        name: String!
        paragraph: String!
        answers: [String!]!
        explanation: String!
        difficulty: Int!
        answerCnt: Int!
        wrongCnt: Int!

    }


`