const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        profile: Profile
        myCoupons: [CouponWithCnt!]!
        coupons: [Coupon!]!
    }
    type Mutation {
        updateProfile(name: String, favorite: [String!]!): NormalResponse
        "graphql-upload 패키지 찾아서 적용해봐"
        updateProfileImg(file: Upload!): File!
        updateMyCoupon(couponId: ID!): NormalResponse
    }

    type Profile {
        ownerId: String!
        tier: Int
        point: Int
        image: String
        logs: [Log!]!
        favorites: [String!]!
        coupons: [CouponWithCnt!]!
        password: String!
        creationDate: Int
    }

    type Log {
        category: String
        correct: Int
        wrong: Int
    }

    type CouponWithCnt {
        id: ID!
        couponId: ID!
        count: Int!
        code: String!
    }

    type Coupon {
        id: ID!
        name: String!
        explanation: String!
        price: Int!
    }
`;