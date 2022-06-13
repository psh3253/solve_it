const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        reviewNote(questionId: Int!): ReviewNote
    }

    type Mutation {
        createReviewNote(input: createReviewNoteInput!): NormalResponse
        deleteReviewNote(questionId: Int!): NormalResponse
    }

    input createReviewNoteInput {
        questionId: ID!
        explanation: String!
    }

    type ReviewNote {
        ownerId: String!
        testId: Int!
        questionID: Int!
        explanation: String
    }
`;