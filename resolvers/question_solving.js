const QuestionSolvingService = require('../services/question_solving');
const Util = require('../util');

const QuestionSolvingResolver = {
    Query: {
        async testLikesCount(parent, {id}, context, info) {
            const likes = await QuestionSolvingService.getTestLikesCount(id);

            return {
                count: likes.count
            };
        }
    },
    Mutation: {
        async contributeDifficulty(parent, {questionId, difficulty}, context, info) {
            if (!await QuestionSolvingService.contributeDifficulty(questionId, difficulty, context.user.id))
                return {
                    code: 200,
                    message: 'already contributed',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: true
            }
        },

        async submitAnswer(parent, {id, answers}, context, info) {
            return {
                code: 200,
                message: 'complete',
                success: await QuestionSolvingService.submitAnswer(id, answers, context.user.id)
            }
        },

        async likeTest(parent, {id}, context, info) {
            const test_id = await QuestionSolvingService.likeTest(id, context.user.id);
            return {
                code: 200,
                message: 'complete',
                success: test_id > 0,
            }
        },

        async unlikeTest(parent, {id}, context, info) {
            const test_id = await QuestionSolvingService.unlikeTest(id);
            return {
                code: 200,
                message: 'complete',
                success: test_id > 0,
            }
        },

        async createAsking(parent, {input}, context, info) {
            return {
                code: 200,
                message: 'complete',
                success: await QuestionSolvingService.createAsking(input.questionId, input.title, input.content, "psh3253")
            }
        },

        async deleteAsking(parent, {id}, context, info) {
            if(!await QuestionSolvingService.isAskingCreator(id, context.user.id))
                return {
                    code: 200,
                    message: 'not creator',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: true
            }
        }
    }
};

module.exports = QuestionSolvingResolver;