const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        profile(ID: String): Profile
        myCoupons: [CouponWithCnt!]!
        coupons: [Coupon!]!
    }
    
    type Mutation {
        updateProfile(name: String, favorite: [String!]!): NormalResponse
        updateProfileImg(file: Upload!): File!
        updateMyCoupon(couponId: ID!): NormalResponse
    }

    type Profile {
        ownerId: String!
        nickname: String!
        image: String
        experience: Int!
        point: Int!
        tier: Int!
        favorites: [String!]
        coupons: [CouponWithCnt!]!
        creationDate: String!
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