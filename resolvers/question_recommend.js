const QuestionRecommandService = require('../services/question_recommend');
const Util = require('../util');

const QuestionRecommandResolver = {
    Query: {
        async tag(parent, {testId}, context, info) {

        },

        async myTag(parent, {userId}, context, info) {

        }
    },
    Mutation: {
        async createTag(parent, {name, testId}, context, info) {

        },

        async deleteTag(parent, {name, testId}, context, info) {
            
        }
    }
}

module.exports = QuestionRecommandResolver;