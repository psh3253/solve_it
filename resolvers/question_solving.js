const QuestionService = require('../services/question_solving');
const QuestionSolvingService = require('../services/question_solving');
const Util = require('../util');

const QuestionSolvingResolver = {
    Query: {
        async testLikesCount(parent, {id}, context, info) {
            return await QuestionSolvingService.getTestLikesCount(id);
        },

        async judgeResult(parent, {testId, questionId}, context, info) {
            return await QuestionSolvingService.getAnswerRecord(testId, questionId, context.user.id).is_correct;
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

        async submitAnswer(parent, {testId, questionId, answers}, context, info) {
            return {
                code: 200,
                message: 'complete',
                success: await QuestionSolvingService.submitAnswer(testId, questionId, answers, context.user.id)
            }
        },

        async judgeAnswer(parent, {testId, questionId}, context, info) {
            const answer_record = await QuestionSolvingService.getAnswerRecord(testId, questionId, context.uer.id);

            // DB returns null? or 'null'?
            if (answer_record.length == 0 || answer_record.answer == null) {
                QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct);
                return Util.normalResponse(200, 'wrong answer', answer_record.is_correct);
            }

            // DB returns true? or 'true'?
            if (answer_record.is_correct == true)
                return Util.normalResponse(200, 'correct answer', answer_record.is_correct);

            const answers = await QuestionService.getAnswer(question_id);
            let answer_list = [];

            for (let answer of answers)
                answer_list.push(answer.answer);

            let user_answers = answer_record.answer.split(',');

            if (answer_list.length != user_answers.length) {
                QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct);
                return Util.normalResponse(200, 'wrong answer', answer_record.is_correct);
            }

            for (let i = 0; i < answer_list.length; ++i) {
                if (answer_list[i] != user_answers[i]) {
                    QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct);
                    return Util.normalResponse(200, 'wrong answer', answer_record.is_correct);
                }
            }

            QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct);
            return Util.normalResponse(200, 'correct answer', answer_record.is_correct);
        },

        async likeTest(parent, {id}, context, info) {
            const test_id = await QuestionSolvingService.likeTest(id, context.user.id);

            return {
                code: 200,
                message: 'complete',
                success: test_id > 0
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