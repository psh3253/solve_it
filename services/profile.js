const profileService = {};
const User = require("../models/user");
require('dotenv').config();

profileService.getUserProfile = async function getUserProfile(user_id) {
    try {
        const profile = await User.findOne({
            attributes: ['nickname'],
            where: {
                id: user_id
            }
        })

        if (profile != null) {
            return profile
        }
        return null
    } catch (e) {
        console.error(e);
    }
}

profileService.updateMyCoupon = async function updateMyCoupon(user_id, coupon_id, coupon_price) {
    try {
        profile = this.getUserProfile(user_id)
        
    }
}
module.exports = profileService;