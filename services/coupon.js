const IssuedCoupon = require("../models/issued_coupon");
const Coupon = require("../models/coupon");
const User = require("../models/user");
const {sequelize} = require('../models');
const couponService = {};

couponService.getUserCoupons = async function getUserCoupons(user_id) {
    try {
        return await IssuedCoupon.findAll({
            attributes: ['count', 'created_at', 'last_used_at', 'coupon_id'],
            where: {
                user_id: user_id
            },
            include: {
                model: Coupon,
                attributes: ['id', 'name', 'explanation', 'price'],
            }
        })
    } catch (e) {
        console.error(e);
    }
}

couponService.getAllCoupons = async function getAllCoupons() {
    try {
        return await Coupon.findAll({
            attributes: ['id', 'name', 'explanation', 'price']
        });
    } catch (e) {
        console.error(e);
    }
}

couponService.addCoupon = async function (name, explanation, price) {
    try {
        await Coupon.create({
            name: name,
            explanation: explanation,
            price: price
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

couponService.deleteCoupon = async function (coupon_id) {
    try {
        await Coupon.destroy({
            where: {
                id: coupon_id
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

couponService.issueCoupon = async function (user_id, coupon_id, count) {
    try {
        const coupon = await Coupon.findOne({
            attributes: ['price'],
            where: {
                id: coupon_id
            }
        });
        const user = await User.findOne({
            attributes: ['point'],
            where: {
                id: user_id
            }
        });
        if (coupon.price * count > user.point)
            return false;
        await IssuedCoupon.create({
            user_id: user_id,
            coupon_id: coupon_id,
            count: count
        });
        await User.update({
            point: user.point - coupon.price * count
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

couponService.useCoupon = async function (user_id, coupon_id) {
    try {
        const issuedCoupon = await IssuedCoupon.findOne({
            attributes: ['count'],
            where: {
                user_id: user_id,
                coupon_id: coupon_id
            }
        });
        if (issuedCoupon.count <= 0)
            return false;
        await IssuedCoupon.update({
            count: issuedCoupon.count - 1,
            last_used_at: new Date()
        }, {
            where: {
                user_id: user_id,
                coupon_id: coupon_id
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = couponService;