const reviewNoteService = {};
const {Op} = require("sequelize");
const ReviewNote = require("../models/review_note");

reviewNoteService.getReviewNote = async (question_id, user_id) => {
    try {
        return await ReviewNote.findOne({
            attributes: ['id', 'explanation', 'creator_id', 'question_id'],
            where: {
                question_id: question_id,
                creator_id: user_id
            }
        })
    } catch (e) {
        console.error(e);
        return null;
    }
}

reviewNoteService.createReviewNote = async (question_id, explanation, user_id) => {
    try {
        await ReviewNote.upsert({
            explanation: explanation,
            creator_id: user_id,
            question_id: question_id
        });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

reviewNoteService.deleteReviewNote = async (question_id, user_id) => {
    try {
        await ReviewNote.destroy({
            where: {
                question_id: question_id,
                creator_id: user_id
            }
        });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = reviewNoteService;