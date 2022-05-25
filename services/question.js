const questionService = {};
const Question = require('../models/question');
const Difficulty = require('../models/difficulty');

questionService.getAllCategoryId = async function getAllCategoryId() {
    try {
    } catch (e) {
        console.error(e);
    }
}

questionService.getQuestion = async (question_id) => {
    try {
        return await Question.findOne({
            attributes: ['id', 'title', 'content', 'type', 'answer', 'try_count', 'difficulty_id', 'category_id'],
            where: {
                id: question_id
            }
        });
    } catch (e) {
        console.error(e);
    }
}

questionService.createQuestion = async (name, paragraph, answers, explanation, type, questionCategory) => {
    try {
        return await Question.create({
            title: name,
            content: paragraph,
            answer: answers,
            type: type,
            question_id: questionCategory
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = questionService;