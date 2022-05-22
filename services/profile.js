const profileService = {};
const User = require('../models/user');
const Category = require('../models/category');

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
                attributes: ['name']
            }
        });
    } catch (e) {
        console.error(e);
    }
}


profileService.updateMyCoupon = async function updateMyCoupon(user_id, coupon_id, coupon_price) {

}

module.exports = profileService;