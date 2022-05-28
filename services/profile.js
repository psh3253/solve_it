const profileService = {};
const {Op} = require("sequelize");
const User = require('../models/user');
const Category = require('../models/category');
const IssuedCoupon = require('../models/issued_coupon');
const Coupon = require('../models/coupon');

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

profileService.getUserCoupons = async function getUserCoupons(user_id) {
    try {
        return await IssuedCoupon.findAll({
            attributes: ['count', 'created_at', 'last_used_at', 'coupon_id'],
            include: {
                model: Coupon,
                attributes: ['id', 'name', 'explanation', 'price']
            }
        })
    } catch (e) {
        console.error(e);
    }
}

profileService.getAllCoupons = async function getAllCoupons() {
    try {
        return await Coupon.findAll({
            attributes: ['id', 'name', 'explanation', 'price']
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

profileService.updateMyCoupon = async function updateMyCoupon(user_id, coupon_id, coupon_price) {

}

module.exports = profileService;