const questionService = {};
const Question = require('../models/question');
const QuestionAnswer = require('../models/question_answer');
const QuestionCandidate = require('../models/question_candidate');
const Difficulty = require('../models/difficulty');

questionService.getQuestion = async (question_id) => {
    try {
        return await Question.findOne({
            attributes: ['id', 'title', 'content', 'type', 'try_count', 'difficulty_id', 'category_id'],
            where: {
                id: question_id
            }
        });
    } catch (e) {
        console.error(e);
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
        for(let i of answers)
        {
            await QuestionAnswer.create({
                answer: i,
                question_id: question.id
            });
        }
        if(type === 'MULTIPLE_CHOICE')
        {
            let number = 0;
            for(let i of candidates)
            {
                await QuestionCandidate.create({
                    number: number,
                    content: i,
                    question_id: question.id
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
