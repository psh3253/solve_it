const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        reviewNote(questionId: ID!): ReviewNote
    }

    type Mutation {
        createReviewNote(input: createReviewNoteInput!): NormalResponse
        deleteReviewNote(questionId: ID!): NormalResponse
    }

    input createReviewNoteInput {
        questionId: ID!
        explanation: String!
    }

    type ReviewNote {
        ownerId: String!
        testId: ID!
        questionID: ID!
        explanation: String
    }
`;