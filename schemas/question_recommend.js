const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        tag(testId: ID!): [Tag]
        myTag(userId: ID!): [Tag]
    }

    type Mutation {
        createTag(name: String!, testId: ID!): NormalResponse
        deleteTag(name: String!, testId: ID!): NormalResponse
    }

    type Tag {
        id: ID!
        name: String!
        ownerId: String!
        creationDate: String!
        testId: ID!
    }
`;