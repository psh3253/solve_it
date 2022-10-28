const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        profile(ID: String): Profile
        statistics(ID: String): Statistics
        categories: [Category!]!
    }

    type Mutation {
        updateProfile(name: String, favorite: [String!]!): NormalResponse
        updateProfileImg(awsRegion: String!, eventTime: String!, imageFileName: String!, imageFileSize: Int!): NormalResponse
    }

    type Profile {
        ownerId: String!
        nickname: String!
        experience: Int!
        point: Int!
        tier: Int
        favorites: [Category!]
        creationDate: String!
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