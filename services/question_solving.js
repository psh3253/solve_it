const questionSolvingService = {};
const Like = require('../models/like');
const Question = require('../models/question');
const AnswerSheet = require('../models/answer_sheet');
const AnswerRecord = require('../models/answer_record');
const TestQuestion = require('../models/test_question');

questionSolvingService.getTestLikesCount = async (test_id) => {
    try {
        return await Like.count({
            where: {
                test_id: test_id
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.likeTest = async (test_id, user_id) => {
    try {
        return await Like.create({
            test_id: test_id,
            creator_id: user_id
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.unlikeTest = async (test_id, user_id) => {
    try {
        return await Like.destroy({
            where: {
                test_id: test_id,
                creator_id: user_id
            }
        });
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

questionSolvingService.submitAnswer = async (question_id, answers, user_id) => {
    try {
        const testQuestion = await this.getTestQuestion(question_id)
        
        await AnswerSheet.create({
            test_id: test_id,
            creator_id: user_id
        });

        const answer_sheet = await AnswerSheet.findOne({
            attribute: [id, created_at, update_at, test_id, creator_id],
            where: {
                test_id: test_id
            }
        });

        for (let i of answers) {
            await AnswerRecord.create({
                answer: i,
                answer_sheet_id: answer_sheet.id,
                test_question_id: testQuestion.id,
                question_id: question_id
            })
        };
        return true;
    } catch (e) {
        console.error(e)
        return false;
    }
}

module.exports = questionSolvingService;