const Util = require('../util');
const ReviewNoteService = require('../services/review_note');

const reviewNoteResolver = {
    Query: {
        async reviewNote(parent, {questionId}, context, info) {
            const review_note = await ReviewNoteService.getReviewNote(questionId, context.user.id);
        
            return {
                id: review_note.id,
                explanation: review_note.explanation
            }
        }
    },
    Mutation: {
        async createReviewNote(parent, {input}, context, info) {
            return Util.normalResponse(200, 'complete',
                await ReviewNoteService.createReviewNote(input.questionId, input.explanation, context.user.id));
        },

        async deleteReviewNote(parent, {questionId}, context, info) {
            return Util.normalResponse(200, 'complete',
                await ReviewNoteService.deleteReviewNote(questionId, context.user.id));
        }
    }
};

module.exports = reviewNoteResolver;