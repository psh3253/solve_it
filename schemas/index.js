const {makeExecutableSchema} = require('@graphql-tools/schema')
const AuthSchema = require('./auth');
const AuthResolver = require('../resolvers/auth');
const ProfileSchema = require('./profile');
const ProfileResolver = require('../resolvers/profile');
const QuestionSchema = require('./question');
const QuestionResolver = require('../resolvers/question');
const QuestionRecommendSchema = require('./question_recommend');
const QuestionRecommendResolver = require('../resolvers/question_recommend');
const QuestionSolvingSchema = require('./question_solving');
const QuestionSolvingResolver = require('../resolvers/question_solving');
const QuestionVerificationSchema = require('./question_verification');
const QuestionVerificationResolver = require('../resolvers/question_verification');
const ReviewNoteSchema = require('./review_note');
const ReviewNoteResolver = require('../resolvers/review_note');
const CouponSchema = require('./coupon');
const CouponResolver = require('../resolvers/coupon');
const {gql} = require('apollo-server');

const Query = gql`
    interface Response {
        code: Int!
        message: String!
        success: Boolean!
    }

    type NormalResponse implements Response {
        code: Int!
        message: String!
        success: Boolean!
    }

    type CreationQuestionResponse implements Response {
        code: Int!
        message: String!
        success: Boolean!
        questionId: Int!
    }

    type UploadResponse implements Response {
        code: Int!
        message: String!
        success: Boolean!
        fileUrl: String
    }

    type CodingTestResultResponse implements Response {
        code: Int!
        message: String!
        success: Boolean!
        result: CodingTestResult!
    }
    
    enum CodingTestResult {
        SUCCESS
        FAIL
        PENDING
        NOT_SUBMITTED
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [Query, AuthSchema, ProfileSchema, QuestionSchema, QuestionRecommendSchema, QuestionSolvingSchema, QuestionVerificationSchema, ReviewNoteSchema, CouponSchema],
    resolvers: [AuthResolver, ProfileResolver, QuestionResolver, QuestionRecommendResolver, QuestionSolvingResolver, QuestionVerificationResolver, ReviewNoteResolver, CouponResolver]
});

module.exports = schema;