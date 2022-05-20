const {gql} = require('apollo-server');

module.exports = gql`
    interface Response {
        code: Int!
        message: String!
        success: Boolean!
    }
    type NormalResponse {
        code: Int!
        message: String!
        success: Boolean!  
    }
    
    type Query {
        profile: Profile
        myCoupones: [CouponWithCnt!]!
        coupons: [Coupon!]!
        getUserProfile(ID: String!): NormalResponse
    }
    type Mutation {
        updateProfile(name: String, favorite: [String!]!): NormalResponse
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

    type ReviewNote {
        ownerId: String!
        testId: Int!
        questionID: Int!
        explanation: String
        reason: String
    }
`;