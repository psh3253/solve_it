const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        tag(tagId: ID!): Tag
        tagsOfTest(testId: ID!): [Tag]
        myTags: [Tag]
    }

    type Mutation {
        createTag(name: String!, testId: ID!): NormalResponse
        updateTag(tagId: ID!, name: String!): NormalResponse
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