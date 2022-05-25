const questionService = {};
const Question = require('../models/question');
const QuestionAnswer = require('../models/question_answer');
const QuestionCandidate = require('../models/question_candidate')
const Difficulty = require('../models/difficulty');
const Category = require('../models/category')

questionService.getQuestion = async (question_id) => {
    try {
        return await Question.findOne({
            attributes: ['id', 'title', 'content', 'type', 'correct_count', 'try_count', 'difficulty_id', 'category_id'],
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
            attribute: ['answer'],
            where: {
                question_id: question_id
            }
        });
    } catch (e) {
        console.error(e);
    }
}

questionService.getCandidate = async (question_id) => {
    try {
        return await QuestionCandidate.findAll({
            attribute: ['number', 'content'],
            where: {
                question_id: question_id,
                order: ['number', 'ASC']
            }
        });
    } catch (e) {
        console.error(e);
    }
}

questionService.createQuestion = async (title, content, answers, explanation, type, category_id, creator_id, difficulty_id) => {
    try {
        const question_id = await Question.create({
            title: title,
            content: content,
            type: type,
            explanation: explanation,
            category_id: category_id,
            creator_id: creator_id,
            difficulty_id: difficulty_id
        });
        for(let i of answers)
        {
            await QuestionAnswer.create({
                answer: i,
                question_id: question_id
            });
        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionService.updateQuestion = async (id, name, paragraph, answers, explanation) => {
    try {
        return await Question.update({
            title: name,
            content: paragraph,
            answer: answers,
            where: {
                id: question_id
            }
        });
	} catch (e) {
	    console.error(e);
    }
}

module.exports = questionService;
