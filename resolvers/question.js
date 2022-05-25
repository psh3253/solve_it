const QuestionService = require('../services/question');
const Util = require('../util');

const QuestionResolver = {
    Question: {
        __resolveType: (question) => {
            if (question.type == "MULTIPLE_CHOICE")
                return "MultipleChoice"
            else
                return "Other"
        }
    },
    Query: {
        async question(parent, {id}, context, info) {
            const question = await QuestionService.getQuestion(id);

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
        async createQuestion(parent, {name, paragraph, answers, explanation, type, category, difficulty}, context, info) {
            console.log(type);
            return {
                code: 200,
                message: 'complete',
                success: await QuestionService.createQuestion(name, paragraph, answers, explanation, type, category, difficulty)
            };
        }
    }
};

module.exports = QuestionResolver;