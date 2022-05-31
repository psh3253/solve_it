const questionService = {};
const QuestionDifficulty = require('../models/question_difficulty');

questionService.contributeDifficulty = async (question_id, difficulty_id, user_id) => {
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
        return false;
    }
}

module.exports = questionService;