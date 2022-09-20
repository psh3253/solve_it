const questionService = {};
const {sequelize} = require('../models');
const Question = require('../models/question');
const QuestionAnswer = require('../models/question_answer');
const QuestionCandidate = require('../models/question_candidate');
const Test = require('../models/test');
const TestQuestion = require('../models/test_question');
const TestTag = require('../models/test_tag');
const Difficulty = require('../models/difficulty');
const Category = require('../models/category');
const User = require('../models/user');

questionService.getQuestion = async (question_id) => {
    try {
        return await Question.findOne({
            attributes: ['id', 'title', 'content', 'type', 'explanation', 'correct_count', 'try_count', 'difficulty_id', 'category_id'],
            where: {
                id: question_id
            },
            include: [{
                model: Category,
                where: Question.category_id,
                attributes: ['id', 'name']
            },
                {
                    model: Difficulty,
                    where: Question.difficulty_id,
                    attribute: ['name', 'experience']
                }]
        });
    } catch (e) {
        console.error(e);
    }
}

questionService.getAnswer = async (question_id) => {
    try {
        return await QuestionAnswer.findAll({
            attributes: ['answer'],
            where: {
                question_id: question_id
            }
        });
    } catch (e) {
        console.error(e);
    }
}

questionService.getExperience = async (question_id) => {
    try {
        const difficulty_id = (await Question.findOne({
            attributes: ['difficulty_id'],
            where: {
                id: question_id
            }
        })).difficulty_id;
        return (await Difficulty.findOne({
            attributes: ['experience'],
            where: {
                id: difficulty_id
            }
        })).experience;
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionService.getCandidate = async (question_id) => {
    try {
        return await QuestionCandidate.findAll({
            attributes: ['number', 'content'],
            where: {
                question_id: question_id,
            }
        });
    } catch (e) {
        console.error(e);
    }
}

questionService.getTest = async (test_id, user_id) => {
    try {
        const test = await Test.findOne({
            attributes: ['id', 'title', 'content', 'try_count', 'created_at', 'category_id', 'is_private', 'creator_id', [
                sequelize.literal('(SELECT count(*) FROM `like` WHERE `test_id` = `Test`.`id`)'), 'like'
            ]],
            where: {
                id: test_id
            },
            include: {
                model: Category,
                attribute: ['id', 'name']
            }
        });
        if (test.is_private && user_id !== test.creator_id)
            return null;
        return test;
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionService.getTestQuestions = async (test_id) => {
    try {
        return await TestQuestion.findAll({
            attributes: ['number', 'question_id'],
            where: {
                test_id: test_id
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionService.getTestTags = async (test_id) => {
    try {
        return TestTag.findAll({
            attributes: ['tag'],
            where: {
                test_id: test_id
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionService.getAllTests = async (page, order) => {
    let order_way;
    switch (order) {
        case 'DATE':
            order_way = ['created_at', 'ASC']
            break;
        case 'DATE_DESC':
            order_way = ['created_at', 'DESC']
            break;
        case 'LIKE':
            order_way = [sequelize.col('like'), 'ASC']
            break;
        case 'LIKE_DESC':
            order_way = [sequelize.col('like'), 'DESC']
            break;
        case 'SOLVING_COUNT':
            order_way = ['try_count', 'ASC']
            break;
        case 'SOLVING_COUNT_DESC':
            order_way = ['try_count', 'DESC']
            break;
        default:
            order_way = ['id', 'DESC']
    }
    try {
        return await Test.findAll({
            attributes: ['id', 'title', 'try_count', 'is_private', 'created_at', 'creator_id', [
                sequelize.literal('(SELECT count(*) FROM `like` WHERE `test_id` = `Test`.`id`)'), 'like'
            ]],
            include: {
                model: Category,
                attributes: ['id', 'name'],
            },
            limit: 10,
            offset: (page - 1) * 10,
            order: [order_way]
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionService.getTestsByCategoryId = async (category_id) => {
    try {
        return await Test.findAll({
            attributes: ['id', 'title', 'try_count', 'is_private', 'created_at', 'creator_id', [
                sequelize.literal('(SELECT count(*) FROM `like` WHERE `test_id` = `Test`.`id`)'), 'like'
            ]],
            where: {
                category_id: category_id
            },
            include: {
                model: Category,
                attributes: ['id', 'name']
            },
            order: [
                ['id', 'DESC']
            ]
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionService.getTestsByCreatorId = async (user_id) => {
    try {
        return await Test.findAll({
            attributes: ['id', 'title', 'try_count', 'is_private', 'created_at', 'creator_id', [
                sequelize.literal('(SELECT count(*) FROM `like` WHERE `test_id` = `Test`.`id`)'), 'like'
            ]],
            where: {
                creator_id: user_id
            },
            include: {
                model: Category,
                attributes: ['id', 'name']
            },
            order: [
                ['id', 'DESC']
            ]
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionService.createQuestion = async (title, content, answers, explanation, type, category_id, creator_id, difficulty_id, candidates) => {
    try {
        const question = await Question.create({
            title: title,
            content: content,
            type: type,
            explanation: explanation,
            category_id: category_id,
            creator_id: creator_id,
            difficulty_id: difficulty_id
        });
        for (let i of answers) {
            await QuestionAnswer.create({
                answer: i,
                question_id: question.id
            });
        }
        if (type === 'MULTIPLE_CHOICE') {
            let number = 1;
            for (let i of candidates) {
                await QuestionCandidate.create({
                    number: number,
                    content: i,
                    question_id: question.id
                })
                number++;
            }
        }
        return question.id;
    } catch (e) {
        console.error(e);
        return 0;
    }
}

questionService.updateQuestion = async (question_id, title, content, answers, explanation, candidates) => {
    try {
        await Question.update({
                title: title,
                content: content,
                explanation: explanation
            },
            {
                where: {
                    id: question_id,
                }
            });
        await QuestionAnswer.destroy({
            where: {
                question_id: question_id
            }
        });
        for (let i of answers) {
            await QuestionAnswer.create({
                question_id: question_id,
                answer: i
            });
        }
        if (type === 'MULTIPLE_CHOICE') {
            await QuestionCandidate.destroy({
                where: {
                    question_id: question_id
                }
            })
            let number = 1;
            for (let i of candidates) {
                await QuestionCandidate.create({
                    number: number,
                    content: i,
                    question_id: question_id
                })
                number++;
            }
        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionService.isQuestionCreator = async (question_id, user_id) => {
    try {
        const question = await Question.findOne({
            attributes: ['creator_id'],
            where: {
                id: question_id,
            }
        });
        return question.creator_id === user_id;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionService.deleteQuestion = async (question_id) => {
    try {
        await Question.destroy({
            where: {
                id: question_id,
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}


questionService.createTest = async (title, content, question_ids, category_id, is_private, creator_id) => {
    try {
        const test = await Test.create({
            title: title,
            content: content,
            creator_id: creator_id,
            category_id: category_id,
            is_private: is_private
        });
        let number = 1;
        for (let i of question_ids) {
            await TestQuestion.create({
                question_id: i,
                test_id: test.id,
                number: number
            });
            number++;
        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionService.isTestCreator = async (test_id, user_id) => {
    try {
        const test = await Test.findOne({
            attributes: ['creator_id'],
            where: {
                id: test_id,
            }
        });
        return test.creator_id === user_id;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionService.updateTest = async (test_id, title, content, question_ids, category_id, is_private) => {
    try {
        await Test.update({
                title: title,
                content: content,
                category_id: category_id,
                is_private: is_private
            },
            {
                where: {
                    id: test_id,
                }
            });
        await TestQuestion.destroy({
            where: {
                test_id: test_id
            }
        });
        let number = 1;
        for (let i of question_ids) {
            await TestQuestion.create({
                question_id: i,
                test_id: test_id,
                number: number
            });
            number++;
        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionService.deleteTest = async (test_id) => {
    try {
        await Test.destroy({
            where: {
                id: test_id,
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = questionService;