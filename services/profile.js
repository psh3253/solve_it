const profileService = {};
const {Op} = require("sequelize");
const User = require('../models/user');
const Category = require('../models/category');
const Tier = require('../models/tier');

profileService.getUserProfile = async function getUserProfile(user_id) {
    try {
        return await User.findOne({
            attributes: ['id', 'nickname', 'experience', 'point', 'created_at', 'tier_id'],
            where: {
                id: user_id
            }
        });
    } catch (e) {
        console.error(e);
    }
}

profileService.getUserCategories = async function getUserCategory(user_id) {
    try {
        return await User.findOne({
            attributes: [],
            where: {
                id: user_id
            },
            include: {
                model: Category,
                attributes: ['id', 'name']
            }
        });
    } catch (e) {
        console.error(e);
    }
}

profileService.getAllCategories = async function getAllCategories() {
    try {
        return await Category.findAll({
            attributes: ['id', 'name']
        });
    } catch (e) {
        console.error(e);
    }
}

profileService.getUserTier = async function getUserTier(user_id) {
    try {
        return await User.findOne({
            attributes: ['tier_id'],
            where: {
                id: user_id
            }
        });
    } catch (e) {
        console.error(e);
    }
}

profileService.addUserExperience = async function addUserExperience(user_id, experience) {
    try {
        await User.increment('experience', {
            by: experience,
            where: {
                id: user_id
            }
        });

        const user = await User.findOne({
            attributes: ['id', 'experience'],
            where: {
                id: user_id
            }
        });

        const tier = await Tier.findOne({
            attributes: ['id'],
            where: {
                required_experience: {
                    [Op.lte]: user.experience
                }
            },
            order: [
                ['required_experience', 'DESC']
            ]
        });
        await User.update({
            tier_id: tier.id
        }, {
            where: {
                id: user_id
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

profileService.updateNickname = async function updateNickname(user_id, nickname) {
    try {
        await User.update({
            nickname: nickname
        }, {
            where: {
                id: user_id
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

profileService.updateCategory = async function updateCategory(user_id, categories) {
    try {
        const user = await User.findOne({
            attributes: ['id'],
            where: {
                id: user_id
            }
        });
        const allCategories = await Category.findAll({
            attributes: ['id']
        });
        await user.removeCategories(allCategories);
        const user_categories_id = await Category.findAll({
            where: {
                name: {
                    [Op.in]: categories
                }
            }
        });
        await user.addCategories(user_categories_id);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = profileService;