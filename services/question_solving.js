const questionSolvingService = {};
const AnswerSheet = require('../models/answer_sheet');
const AnswerRecord = require('../models/answer_record');
const Test = require('../models/test');
const TestQuestion = require('../models/test_question');
const QuestionDifficulty = require('../models/question_difficulty');
const Asking = require('../models/asking');
const Reply = require('../models/reply');
const User = require('../models/user');
const {sequelize} = require("../models/index");
const Category = require("../models/category");
const Question = require("../models/question");

questionSolvingService.contributeDifficulty = async (question_id, difficulty_id, user_id) => {
    try {
        const user = await User.findOne({
            attributes: ['id', 'tier_id'],
            where: {
                id: user_id
            }
        });
        if(user.tier_id < 3) {
            return false;
        }
        const result = await QuestionDifficulty.findOrCreate({
            attributes: ['question_id'],
            where: {
                question_id: question_id,
                creator_id: user_id,
            },
            defaults: {
                question_id: question_id,
                difficulty_id: difficulty_id,
                creator_id: user_id
            }
        });
        const difficulty = await QuestionDifficulty.findOne({
            attributes: [[sequelize.fn('round', sequelize.fn('avg', sequelize.col('difficulty_id')), 0), 'difficulty']],
            where: {
                question_id: question_id
            },
            group: ['question_id'],
        });
        await Question.update({
            difficulty_id: difficulty.dataValues.difficulty
        }, {
            where: {
                id: question_id
            }
        });
        return true;
    } catch (e) {
        console.error(e);
    }
}

questionSolvingService.getTestLikesCount = async (test_id) => {
    try {
        const test = await Test.findOne({
            attributes: ['id'],
            where: {
                id: test_id
            }
        });

        return await test.countUsers();
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.likeTest = async (test_id, user_id) => {
    try {
        const test = await Test.findOne({
            attributes: ['id'],
            where: {
                id: test_id
            }
        });

        await test.addUser(user_id);
        return 1;
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.unlikeTest = async (test_id, user_id) => {
    try {
        const test = await Test.findOne({
            attributes: ['id'],
            where: {
                id: test_id,
                creator_id: user_id
            }
        });

        await test.removeUser(user_id);
        return 1;
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.getTestQuestion = async (question_id) => {
    try {
        return await TestQuestion.findOne({
            attribute: ['id', 'number', 'test_id'],
            where: {
                question_id: question_id
            }
        })
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.getAnswerSheet = async (test_id, user_id) => {
    try {
        return await AnswerSheet.findOne({
            attribute: ['id', 'created_at', 'update_at', 'test_id', 'creator_id'],
            where: {
                test_id: test_id,
                creator_id: user_id
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.getTestQuestion = async (test_id, question_id) => {
    try {
        return await TestQuestion.findOne({
            attribute: ['id', 'number'],
            where: {
                test_id: test_id,
                question_id: question_id
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.getAllTestQuestion = async (test_id) => {
    try {
        return await TestQuestion.findAll({
            attribute: ['id', 'number', 'question_id'],
            where: {
                test_id: test_id
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.submitAnswer = async (test_id, question_id, answers, user_id) => {
    try {
        const answer_sheet = await questionSolvingService.getAnswerSheet(test_id, user_id);
        if (answer_sheet == null) {
            await AnswerSheet.create({
                test_id: test_id,
                creator_id: user_id
            });
        }

        else {
            await AnswerSheet.update({
                test_id: test_id,
                creator_id: user_id,
            }, {
                where: {
                    id: answer_sheet.id
                }
            });
        }

        const test_question = await questionSolvingService.getTestQuestion(test_id, question_id);

        await AnswerRecord.upsert({
            answer: answers,
            answer_sheet_id: answer_sheet.id,
            test_question_id: test_question.id,
            question_id: question_id
        });
        return true;
    } catch (e) {
        console.error(e)
        return false;
    }
}

questionSolvingService.getAnswerRecord = async (test_id, question_id, user_id) => {
    try {
        const answer_sheet = await questionSolvingService.getAnswerSheet(test_id, user_id);
        const test_question = await questionSolvingService.getTestQuestion(test_id, question_id);

        return await AnswerRecord.findOne({
            attributes: ['id', 'answer', 'is_correct'],
            where: {
                answer_sheet_id: answer_sheet.id,
                test_question_id: test_question.id
            }
        });
    } catch (e) {
        console.error(e)
        return null;
    }
}

questionSolvingService.getAnswerRecords = async (test_id, user_id) => {
    try {
        const answer_sheet = await questionSolvingService.getAnswerSheet(test_id, user_id);
        const test_questions = await questionSolvingService.getAllTestQuestion(test_id);

        let answer_record_list = [];

        for (let test_question of test_questions) {
            answer_record_list.push(
                await AnswerRecord.findOne({
                    attributes: ['id', 'answer', 'is_correct', 'question_id'],
                    where: {
                        answer_sheet_id: answer_sheet.id,
                        test_question_id: test_question.id
                    }
                })
            );
        }

        return answer_record_list;
    } catch (e) {
        console.error(e)
        return null;
    }
}

questionSolvingService.isAskingCreator = async (asking_id, user_id) => {
    try {
        const asking = await Asking.findOne({
            attributes: ['creator_id'],
            where: {
                id: asking_id,
            }
        });
        return asking.creator_id === user_id;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionSolvingService.createAsking = async (question_id, title, content, creator_id) => {
    try {
        await Asking.create({
            title: title,
            content: content,
            question_id: question_id,
            creator_id: creator_id
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionSolvingService.deleteAsking = async (asking_id) => {
    try {
        await Asking.destroy({
            where: {
                id: asking_id
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionSolvingService.getAskingByQuestionId = async (question_id) => {
    try {
        return await Asking.findAll({
            attributes: ['id', 'title', 'content', 'created_at', 'question_id', 'creator_id'],
            where: {
                question_id: question_id
            }
        });
    } catch (e) {
        console.error(e);
        return null
    }
}

questionSolvingService.getAsking = async (asking_id) => {
    try {
        return await Asking.findOne({
            attributes: ['id', 'title', 'content', 'created_at', 'question_id', 'creator_id'],
            where: {
                id: asking_id
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.updateJudgeResult = async (answer_record_id, is_correct) => {
    try {
        await AnswerRecord.update({
            is_correct: is_correct
        }, {
            where: {
                id: answer_record_id
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionSolvingService.getSolvingTests = async (user_id) => {
    try {
        return await Test.findAll({
            attributes: ['id', 'title', 'try_count', ['private', 'is_private'], 'created_at', 'creator_id', [
                sequelize.literal('(SELECT count(*) FROM `like` WHERE `test_id` = `Test`.`id`)'), 'like'
            ]],
            include: [{
                model: AnswerSheet,
                where: {
                    creator_id: user_id
                },
                order: [
                    ['updated_at', 'DESC']
                ]
            }, {
                model: Category,
                attributes: ['id', 'name']
            }]
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.isReplyCreator = async (reply_id, user_id) => {
    try {
        const reply = await Reply.findOne({
            attributes: ['creator_id'],
            where: {
                id: reply_id,
            }
        });
        return reply.creator_id === user_id;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionSolvingService.getRepliesByAskingId = async (asking_id) => {
    try {
        return await Reply.findAll({
            attributes: ['id', 'content', 'created_at', 'creator_id', 'asking_id'],
            where: {
                asking_id: asking_id
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.createReply = async (asking_id, content, creator_id) => {
    try {
        await Reply.create({
            asking_id: asking_id,
            content: content,
            creator_id: creator_id
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionSolvingService.deleteReply = async (reply_id) => {
    try {
        await Reply.destroy({
            where: {
                id: reply_id
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = questionSolvingService;