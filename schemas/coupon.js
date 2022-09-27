const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        myCoupons: [CouponWithCnt!]!
        coupons: [Coupon!]!
    }

    type Mutation {
        addCoupon(name: String!, explanation: String!, price: Int!): NormalResponse
        deleteCoupon(couponID: ID!): NormalResponse
        issueCoupon(couponID: ID!, count: Int!): NormalResponse
        useCoupon(couponID: ID!): NormalResponse
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
`;