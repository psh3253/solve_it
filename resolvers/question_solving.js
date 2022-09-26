const { getAnswer } = require('../services/question');
const QuestionService = require('../services/question');
const QuestionSolvingService = require('../services/question_solving');
const ProfileService = require('../services/profile');
const Util = require('../util');

const QuestionSolvingResolver = {
    Query: {
        async testLikesCount(parent, {id}, context, info) {
            return await QuestionSolvingService.getTestLikesCount(id);
        },

        async questionAnswer(parent, {testId, questionId}, context, info) {
            return await QuestionSolvingService.getAnswerRecord(testId, questionId, context.user.id).is_correct;
        },

        async testAnswers(parent, {testId}, context, info) {
            const answer_records = await QuestionSolvingService.getAnswerRecords(testId, context.user.id);
            let results = [];

            if (answer_records === null) return [];
            for (let record of answer_records) {
                if (record === null) continue

                const answers = await QuestionService.getAnswer(record.question_id);
                let answer_list = [];

                for (let answer of answers)
                    answer_list.push(answer.answer);

                results.push({
                    questionId: record.question_id,
                    correctAnswer: answer_list,
                    myAnswer: record.answer,
                    is_correct: record.is_correct
                });
            }
            return results;
        },

        async mySolvingTests(parent, args, context, info) {
            const tests = await QuestionSolvingService.getSolvingTests(context.user.id);

            if (tests === null) return [];

            let test_list = [];
            for (let i of tests) {
                test_list.push({
                    id: i.id,
                    name: i.title,
                    ownerId: i.creator_id,
                    creationDate: Util.getDateString(i.created_at),
                    is_private: i.is_private,
                    tryCnt: i.try_count,
                    like: i.dataValues.like,
                    testCategory: {
                        id: i.Category.id,
                        name: i.Category.name
                    }
                })
            }
            return test_list;
        },

        async askingByQuestion(parent, {id}, context, info) {
            const asking = await QuestionSolvingService.getAskingByQuestionId(id);

            if (asking === null) return [];

            let asking_list = [];
            for (let i of asking) {
                asking_list.push({
                    id: i.id,
                    title: i.title,
                    content: i.content,
                    ownerId: i.creator_id,
                    creationDate: Util.getDateString(i.created_at),
                    questionId: i.question_id
                });
            }
            return asking_list;
        },

        async repliesByAsking(parent, {id}, context, info) {
            const replies = await QuestionSolvingService.getRepliesByAskingId(id);

            if (replies === null) return [];

            let reply_list = [];
            for (let i of replies) {
                reply_list.push({
                    id: i.id,
                    content: i.content,
                    ownerId: i.creator_id,
                    creationDate: Util.getDateString(i.created_at),
                    askingId: i.asking_id
                });
            }
            return reply_list;
        },

        async allAsking(parent, {page}, context, info) {
            const askings = await QuestionSolvingService.getAllAsking(page);

            if (askings === null) return [];

            let asking_list = [];

            for (let asking of askings) {
                asking_list.push({
                    id: asking.id,
                    title: asking.title,
                    content: asking.content,
                    ownerId: asking.creator_id,
                    creationDate: asking.created_at,
                    questionId: asking.question_id
                })
            }
            return asking_list;
        }
    },
    Mutation: {
        async contributeDifficulty(parent, {questionId, difficulty}, context, info) {
            if (!await QuestionSolvingService.contributeDifficulty(questionId, difficulty, context.user.id))
                return {
                    code: 200,
                    message: 'under tier',
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


            if (answer_record.length === 0) {
                return Util.normalResponse(200, 'complete',
                    QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct));
            }
            for (let answer of answers)
                answer_list.push(answer.answer);


            if (answer_list.length !== user_answers.length) {
                return Util.normalResponse(200, 'complete',
                    QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct));
            }

            for (let i = 0; i < answer_list.length; ++i) {
                if (answer_list[i] !== user_answers[i]) {
                    return Util.normalResponse(200, 'complete',
                        QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct));
                }
            }

            return Util.normalResponse(200, 'complete',
                QuestionSolvingService.updateJudgeResult(answer_record.id, answer_record.is_correct));
        },

        async judgeAnswers(parent, {testId}, context, info) {
            try {
                let total_experience = 0;
                const answer_records = await QuestionSolvingService.getAnswerRecords(testId, context.user.id);

                for (let record of answer_records) {
                    let status = false;
                    const answers = await QuestionService.getAnswer(record.question_id);
                    let answer_list = [];
                    let user_answers = record.answer.split(',');

                    if (record.length === 0 || record.answer == null) {
                        await QuestionSolvingService.updateJudgeResult(record.id, false);
                        continue;
                    }
                    for (let answer of answers)
                        answer_list.push(answer.answer);


                    if (answer_list.length !== user_answers.length) {
                        await QuestionSolvingService.updateJudgeResult(record.id, false);
                        continue;
                    }

                    for (let i = 0; i < answer_list.length; ++i) {
                        if (answer_list[i] !== user_answers[i]) {
                            await QuestionSolvingService.updateJudgeResult(record.id, false);
                            status = true;
                        }
                    }
                    if (status)
                        continue;
                    await QuestionSolvingService.updateJudgeResult(record.id, true);
                    total_experience += QuestionSolvingService.getExperience(record.question_id);
                }
                await ProfileService.addUserExperience(context.user.id, total_experience);
                return Util.normalResponse(200, 'complete', true);
            } catch (e) {
                console.error(e);
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
            const test_id = await QuestionSolvingService.unlikeTest(id, context.user.id);
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
                success: await QuestionSolvingService.createAsking(input.questionId, input.title, input.content, context.user.id)
            }
        },

        async deleteAsking(parent, {id}, context, info) {
            if (!await QuestionSolvingService.isAskingCreator(id, context.user.id))
                return {
                    code: 200,
                    message: 'not creator',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: await QuestionSolvingService.deleteAsking(id)
            }
        },

        async createReply(parent, {input}, context, info) {
            return {
                code: 200,
                message: 'complete',
                success: await QuestionSolvingService.createReply(input.askingId, input.content, context.user.id)
            }
        },

        async deleteReply(parent, {id}, context, info) {
            if (!await QuestionSolvingService.isReplyCreator(id, context.user.id))
                return {
                    code: 200,
                    message: 'not creator',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: await QuestionSolvingService.deleteReply(id)
            }
        }
    }
};
module.exports = QuestionSolvingResolver;