const QuestionSolvingService = require('../services/question_solving');

const QuestionSolvingResolver = {
    Query: {

    },
    Mutation: {
        async contributeDifficulty(parent, {questionId, difficultyId}, context, info)
        {
            if(!await QuestionSolvingService.contributeDifficulty(questionId, difficultyId, context.user.id))
                return {
                    code: 200,
                    message: 'already contributed',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: true
            }
        }
    }
};

module.exports = QuestionSolvingResolver;