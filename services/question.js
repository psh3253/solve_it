const questionService = {};
const Question = require('../models/question');
const QuestionAnswer = require('../models/question_answer');
const QuestionCandidate = require('../models/question_candidate');
const Test = require('../models/test');
const TestQuestion = require('../models/test_question');
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

questionService.createTest = async (title, content, question_ids, category_id, creator_id) => {
    try {
        const test = await Test.create({
            title: title,
            content: content,
            creator_id: creator_id,
            category_id: category_id
        });
        let number = 1;
        for(let i of question_ids) {
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
