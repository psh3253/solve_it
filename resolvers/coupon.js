const CouponService = require('../services/coupon');
const ProfileService = require("../services/profile");

const couponResolver = {
    Query: {
        async coupons(parent, args, context, info) {
            const allCoupons = await CouponService.getAllCoupons();
            let coupons = [];
            for(let i of allCoupons)
            {
                coupons.push({
                    id: i.id,
                    name: i.name,
                    explanation: i.explanation,
                    price: i.price
                })
            }
            return coupons;
        },

        async myCoupons(parent, args, context, info) {
            const userCoupons = await CouponService.getUserCoupons(context.user.id);

            if (userCoupons === null)
                return [];

            let coupons = [];
            for(let i of userCoupons) {
                coupons.push({
                    count: i.count,
                    coupon: {
                        id: i.Coupon.id,
                        name: i.Coupon.name,
                        explanation: i.Coupon.explanation,
                        price: i.Coupon.price
                    }
                })
            }
            return coupons;
        }
    },

    Mutation: {
        async addCoupon(parent, args, context, info) {
            return CouponService.addCoupon(args.name, args.explanation, args.price);
        },

        async deleteCoupon(parent, args, context, info) {
            return CouponService.deleteCoupon(args.couponID);
        },

        async issueCoupon(parent, args, context, info) {
            return CouponService.issueCoupon(context.user.id, args.couponID, args.count);
        },

        async useCoupon(parent, args, context, info) {
            return CouponService.useCoupon(context.user.id, args.couponID);
        }
    }
};