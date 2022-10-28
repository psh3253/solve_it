const QuestionRecommendService = require('../services/question_recommend');
const QuestionService = require('../services/question');
const Util = require('../util');

function convertTagAttributes(sequelizeTagReturn) {
    return {
        id: sequelizeTagReturn.id,
        name: sequelizeTagReturn.tag,
        ownerId: sequelizeTagReturn.creator_id,
        creationDate: Util.getDateString(sequelizeTagReturn.created_at),
        testId: sequelizeTagReturn.test_id
    }
}

function buildTagList(sequelizeTagsReturn) {
    const tag_list = [];
    for (let tag of sequelizeTagsReturn) {
        tag_list.push(convertTagAttributes(tag))
    }
    return tag_list;
}

const QuestionRecommendResolver = {
    Query: {
        async tag(parent, {tagId}, context, info) {
            const found = await QuestionRecommendService.getTag(tagId);
            if (found === null) return null;
            return convertTagAttributes(found)
        },

        async tagsOfTest(parent, {testId}, context, info) {
            const tags = await QuestionService.getTestTags(testId);
            if (tags === null) return null;
            return buildTagList(tags)
        },

        async myTags(parent, args, context, info) {
            const tags = await QuestionRecommendService.getMyTags(context.user.id);
            if (tags === null) return null;
            return buildTagList(tags);
        }
    },
    Mutation: {
        async createTag(parent, {name, testId}, context, info) {
            return Util.normalResponse(200, 'complete',
                await QuestionRecommendService.createTag(name, testId, context.user.id))
        },

        async updateTag(parent, {tagId, name}, context, info) {
            return Util.normalResponse(200, 'complete',
                await QuestionRecommendResolver.updateTag(tagId, name, context.user.id))
        },

        async deleteTag(parent, {name, testId}, context, info) {
            return Util.normalResponse(200, 'complete',
                await QuestionRecommendService.deleteTag(name, testId, context.user.id))
        }
    }
}

module.exports = QuestionRecommendResolver;