const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        profile(ID: String): Profile
        profilesByExp(page: Int!, includeAdmin: Boolean): [ProfileHeader]!
        profilesCount(includeAdmin: Boolean): Int!
        statistics(ID: String): Statistics
        categories: [Category!]!
    }

    type Mutation {
        updateProfile(name: String, favorite: [String!]!): NormalResponse
        lambdaUploadProfileImg(awsRegion: String!, eventTime: String!, fileName: String!, fileExtension: String!, fileSize: Int!, userId: ID!): NormalResponse
    }

    type Profile {
        ownerId: String!
        nickname: String!
        experience: Int!
        point: Int!
        tier: Int
        favorites: [Category!]
        role: Int
        creationDate: String!,
        solveCount: Int!
        correctCount: Int!
    }

    type ProfileHeader {
        ownerId: String!
        nickname: String!
        experience: Int!
        tier: Int
        role: Int!
    }

    type Statistics {
        try_count: Int!
        correct_count: Int!
        category_log: [Log!]!
    }

    type Log {
        category: String
        try_count: Int
        correct_count: Int
    }

    type Category {
        id: ID!
        name: String!
    }
`;