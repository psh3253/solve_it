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
            const answers = await QuestionService.getAnswer(id);
            const candidates = await QuestionService.getCandidate(id);

            const wrong_count = question.try_count - question.correct_count
            let answer_list = [];
            let candidate_list = [];
            
            for (let i of answers) {
                answer_list.push({
                    answer: i.answer
                })
            }
            for (let i of candidates) {
                candidate_list.push({
                    number: i.number,
                    content: i.content
                })
            }
            
            return {
                id: question.id,
                name: question.title,
                paragraph: question.content,
                answers: answer_list,
                explanation: question.explanation,
                type: question.type,
                difficulty: question.Difficulty,
                answerCnt: question.try_count,
                wrongCnt: wrong_count,
                questionCategory: question.Category,
                candidates: candidate_list
            };
        }
    },
    Mutation: {
        async createQuestion(parent, {input}, context, info) {
            const question_id = await QuestionService.createQuestion(input.name, input.paragraph, input.answers, input.explanation, input.type, input.questionCategory, context.user, input.questionDifficulty, input.candidates);
            return {
                code: 200,
                message: 'complete',
                success: question_id > 0,
                questionId: question_id
            }
        },

        async createTest(parent, {input}, context, info) {
            context.user = "psh3253";
            return {
                code: 200,
                message: 'complete',
                success: await QuestionService.createTest(input.name, input.content, input.questionIds, input.categoryId, context.user)
            }
        }
    }
};

module.exports = QuestionResolver;