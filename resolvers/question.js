const QuestionService = require('../services/question');
const Util = require('../util');

const QuestionResolver = {
    Query: {
        async question(parent, {ID}, context, info) {
            const question = await QuestionService.getQuestion(ID);

            return {
                id: question.id,
                name: question.title,
                paragraph: question.content,
                answers: question.answer,
                // explanation: question.explanation,
                type: question.type,
                difficulty: question.difficulty_id,
                answerCnt: question.try_count,
                // wrongCnt: question.wrong_count,
                questionCategory: question.category_id
            };
        }
    },
    Mutation: {
        async createQuestion(parent, {name, paragraph, answers, explanation, type, questionCategory}, context, info) {
            await QuestionService.createQuestion(name, paragraph, answers, explanation, type, questionCategory);
        }
    }
};

module.exports = QuestionResolver;