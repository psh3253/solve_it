const questionSolvingService = {};
const Question = require('../models/question');
const AnswerSheet = require('../models/answer_sheet');
const AnswerRecord = require('../models/answer_record');
const User = require('../models/user');
const Test = require('../models/test');
const TestQuestion = require('../models/test_question');
const QuestionDifficulty = require('../models/question_difficulty');
const QuestionAnswer = require('../models/question_answer');

const QuestionService = require('../services/question');
const Asking = require('../models/asking');
const Reply = require('../models/reply');

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

questionSolvingService.submitAnswer = async (test_id, question_id, answers, user_id) => {
    try {
        await AnswerSheet.create({
            test_id: test_id,
            creator_id: user_id
        });

        const answer_sheet = this.getAnswerSheet(test_id, user_id);

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

questionSolvingService.getAnswerRecord = async (test_id, question_id, user_id) => {
    try {
        const answer_sheet = this.getAnswerSheet(test_id, user_id);
        const test_question = this.getTestQuestion(test_id, question_id);

        return await AnswerRecord.findOne({
            attributes: ['id', 'answer', 'is_correct'],
            where: {
                answer_sheet_id: answer_sheet.id,
                test_question_number: test_question.number
            }
        });
    } catch (e) {
        console.error(e);
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

questionSolvingService.getAskingsByQuestionId = async (question_id) => {
    try {
        return await Asking.findAll({
            attributes: ['id', 'title', 'created_at', 'question_id', 'creator_id']
        });
    } catch (e) {
        console.error(e);
        return null
    }
}

questionSolvingService.getAsking = async (asking_id) => {
    try {
        return await Asking.findOne({
            attributes: ['id', 'title', 'content', 'created_at', 'question_id', 'creator_id']
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionSolvingService.updateJudgeResult = async (answer_record_id, is_correct) => {
    try {
        await AnswerRecord.update({
            is_correct: is_correct,
            where: {
                id: answer_record_id
            }
        });
    } catch (e) {
        console.error(e);
        return e;
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

module.exports = questionSolvingService;