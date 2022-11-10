const profileService = {};
const {sequelize} = require('../models');
const {Op} = require("sequelize");
const User = require('../models/user');
const Category = require('../models/category');
const Tier = require('../models/tier');

profileService.isAdmin = async function (user_id) {
    try {
        const user = await User.findOne({
            attributes: ['role'],
            where: {
                id: user_id
            }
        });
        return user.role === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
}

profileService.getUserProfile = async function (user_id) {
    try {
        return await User.findOne({
            attributes: ['id', 'nickname', 'image_url', 'experience', 'point', 'created_at', 'tier_id', 'role'],
            where: {
                id: user_id
            }
        });
    } catch (e) {
        console.error(e);
    }
}

profileService.getUserCategories = async function (user_id) {
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

profileService.getAllCategories = async function () {
    try {
        return await Category.findAll({
            attributes: ['id', 'name']
        });
    } catch (e) {
        console.error(e);
    }
}

profileService.getUserTier = async function (user_id) {
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

profileService.addUserExperience = async function (user_id, experience) {
    try {
        return await sequelize.transaction(async (t) => {
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
        });
    } catch (e) {
        console.error(e);
        return false;
    }
}

profileService.getUserProfilesByExp = async (page, include_admin) => {
    try {
        if (include_admin) {
            return await User.findAll({
                attributes: ['id', 'nickname', 'image_url', 'experience', 'point', 'created_at', 'tier_id', 'role'],
                limit: 10,
                offset: (page - 1) * 10,
                order: [['experience', 'DESC']],
            });
        }

        return await User.findAll({
            attributes: ['id', 'nickname', 'image_url', 'experience', 'point', 'created_at', 'tier_id', 'role'],
            where: {
                role: 0
            },
            limit: 10,
            offset: (page - 1) * 10,
            order: [['experience', 'DESC']],
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

profileService.updateNickname = async function (user_id, nickname) {
    try {
        return await sequelize.transaction(async (t) => {
            await User.update({
                nickname: nickname
            }, {
                where: {
                    id: user_id
                }
            });
            return true;
        });
    } catch (e) {
        console.error(e);
        return false;
    }
}

profileService.updateCategory = async function (user_id, categories) {
    try {
        return await sequelize.transaction(async (t) => {
            const user = await User.findOne({
                attributes: ['id'],
                where: {
                    id: user_id
                }
            });
            const allCategories = await Category.findAll({
                attributes: ['id']
            });
            await user.removeCategories(allCategories); // ???
            const user_categories_id = await Category.findAll({
                where: {
                    name: {
                        [Op.in]: categories
                    }
                }
            });
            await user.addCategories(user_categories_id);
            return true;
        });
    } catch (e) {
        console.error(e);
        return false;
    }
}

profileService.updateProfileImg = async function (user_id, image_url) {
    try {
        return await sequelize.transaction(async (t) => {
            const user = await User.findOne({
                attributes: ['id'],
                where: {
                    id: user_id
                }
            })
            if (user === null) return false;

            await User.update({
                    image_url: image_url
                },
                {
                    where: {
                        id: user.id
                    }
                })
            return true;
        });
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = profileService;