const TestTag = require("../models/test_tag");
const QuestionRecommendService = {};

QuestionRecommendService.getTag = async (tag_id) => {
    try {
        return await TestTag.findOne({
            attributes: ['id', 'tag', 'created_at', 'creator_id', 'test_id'],
            where: {
                id: tag_id
            }
        })
    } catch (e) {
        console.error(e);
        return null;
    }
}

QuestionRecommendService.getMyTags = async (user_id) => {
    try {
        return await TestTag.findAll({
            attributes: ['id', 'tag', 'created_at', 'creator_id', 'test_id'],
            where: {
                creator_id: user_id
            }
        })
    } catch (e) {
        console.error(e);
        return null;
    }
}

QuestionRecommendService.createTag = async (name, test_id, user_id) => {
    try {
        await TestTag.create({
            tag: name,
            test_id: test_id,
            creator_id: user_id
        })
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

QuestionRecommendService.updateTag = async (tag_id, name) => {
    try {
        await TestTag.update({
            tag: name
        }, {
            where: {
                id: tag_id
            }
        })
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

QuestionRecommendService.deleteTag = async (name, test_id, user_id) => {
    try {
        await TestTag.destroy({
            where: {
                tag: name,
                test_id: test_id,
                creator_id: user_id
            }
        })
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = QuestionRecommendService;