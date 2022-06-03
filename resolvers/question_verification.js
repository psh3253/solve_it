const QuestionService = require('../services/question');
const QuestionSolvingService = require('../services/question_solving');
const QuestionVerificationService = require('../services/question_verification');
const Util = require('../util');

const QuestionVerificationResolver = {
    Query: {
        async allReports(parent, {page}, context, info) {

        },

        async reportsByType(parent, {type}, context, info) {

        }
    },
    Mutation: {
        async createReport(parent, {input}, context, info) {

        }
    }
}