const questionSolvingService = {};
const Question = require('../models/question');
const AnswerSheet = require('../models/answer_sheet');
const AnswerRecord = require('../models/answer_record');
const User = require('../models/user');
const Test = require('../models/test');
const TestQuestion = require('../models/test_question');
const QuestionDifficulty = require('../models/question_difficulty');

questionSolvingService.contributeDifficulty = async (question_id, difficulty_id, user_id) => {
    try {
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
        return result[1];
    } catch (e) {
        console.error(e);
    }
}

questionSolvingService.getTestLikesCount = async (test_id) => {
    try {
        const test = await Test.findAll({
            attributes: ['id'],
            where: {
                id: test_id
            }
        });

        await test.countUsers(user_id);
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
                //include
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
                id: test_id
            }
        });

        await test.removeUser(user_id);
        return 1;
    } catch (e) {
        console.error(e);
        return null;
    }
},

questionSolvingService.getTestQuestion = async (question_id) => {
    try {
        return await TestQuestion.findOne({
            attribute: [id, number, test_id],
            where: {
                question_id: question_id
            }
        })
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.submitAnswer = async (test_id, question_id, answers, user_id) => {
    try {
        await AnswerSheet.create({
            test_id: test_id,
            creator_id: user_id
        });

        const answer_sheet = await AnswerSheet.findOne({
            attribute: ['id', 'created_at', 'update_at', 'test_id', 'creator_id'],
            where: {
                test_id: test_id
            }
        });

        await AnswerRecord.create({
            answer: answers,
            answer_sheet_id: answer_sheet.id,
            test_question_id: test_id,
            question_id: question_id
        });
        return true;
    } catch (e) {
        console.error(e)
        return false;
    }
}

module.exports = questionSolvingService;