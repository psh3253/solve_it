const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        profile(ID: String): Profile
        myCoupons: [CouponWithCnt!]!
        statistics(ID: String): Statistics
        coupons: [Coupon!]!
        categories: [Category!]!
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
        tier: Int
        favorites: [String!]
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

    type CouponWithCnt {
        coupon: Coupon!
        count: Int!
    }

    type Coupon {
        id: ID!
        name: String!
        explanation: String!
        price: Int!
    }

    type Category {
        id: ID!
        name: String!
    }
`;