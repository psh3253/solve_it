const QuestionService = require('../services/question_solving');
const QuestionSolvingService = require('../services/question_solving');
const Util = require('../util');

const QuestionSolvingResolver = {
    Query: {
        async testLikesCount(parent, {id}, context, info) {
            return await QuestionSolvingService.getTestLikesCount(id);
        },

        async questionJudgeResult(parent, {testId, questionId}, context, info) {
            return await QuestionSolvingService.getAnswerRecord(testId, questionId, context.user.id).is_correct;
        },

        async testJudgeResult(parent, {testId}, context, info) {
            const answer_records = QuestionSolvingService.getAnswerRecords(testId);
            let results = [];
            
            for (let record of answer_records) {
                results.push(record.is_correct);
            }

            return results;
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
            const answers = await QuestionService.getAnswer(questionId);
            let answer_list = [];
            let user_answers = answer_record.answer.split(',');


            if (answer_record.length == 0 || answer_record.answer == null) {
                
                return Util.normalResponse(200, 'complete',
                        QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct));
            }

            if (answer_record.is_correct == true)
                return Util.normalResponse(200, 'complete',
                        QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct));


            for (let answer of answers)
                answer_list.push(answer.answer);

            
            if (answer_list.length != user_answers.length) {
                return Util.normalResponse(200, 'complete',
                        QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct));
            }

            for (let i = 0; i < answer_list.length; ++i) {
                if (answer_list[i] != user_answers[i]) {
                    return Util.normalResponse(200, 'complete',
                            QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct));;
                }
            }

            return Util.normalResponse(200, 'complete',
                    QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct));
        },

        async judgeAnswers(parent, {testId}, context, info) {
            try {
                const answer_records = await QuestionSolvingService.getAnswerRecords(testId, context.user.id);
                console.log(answer_records);

                for (let record of answer_records) {
                    const answers = await QuestionService.getAnswer(questionId);
                    let answer_list = [];
                    let user_answers = record.answer.split(',');
        
                    if (record.length == 0 || record.answer == null) {
                        QuestionSolvingService.updateJudgeResult(record.id, record.is_correct);
                        continue;
                    }
        
                    if (record.is_correct == true)
                        continue;
        
                    
                    for (let answer of answers)
                        answer_list.push(answer.answer);
        
        
                    if (answer_list.length != user_answers.length) {
                        QuestionSolvingService.updateJudgeResult(record.id, record.is_correct);
                        continue;
                    }
        
                    for (let i = 0; i < answer_list.length; ++i) {
                        if (answer_list[i] != user_answers[i]) {
                            QuestionSolvingService.updateJudgeResult(record.id, record.is_correct);
                            continue;
                        }
                    }
        
                    QuestionSolvingService.updateJudgeResult(record.id, record.is_correct);
                }

                return Util.normalResponse(200, 'complete', true);
            } catch (e) {
                console.log(e);
                return Util.normalResponse(200, 'judge failed', false);
            }
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