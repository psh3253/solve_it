// const {GraphQLUpload} = require('graphql-upload')
const ProfileService = require('../services/profile');
const Util = require('../util');
const AuthService = require("../services/auth");

const profileResolver = {
    // Upload: GraphQLUpload,
    Query: {
        async profile(parent, {ID}, context, info) {
            let targetID = ID;
            if (targetID === null) {
                targetID = context.user.id;
            }
            const userProfile = await ProfileService.getUserProfile(targetID);
            const userCategories = await ProfileService.getUserCategories(targetID);
            let categories = [];

            for (let i of userCategories.Categories) {
                categories.push({
                    id: i.id,
                    name: i.name
                });
            }
            return {
                ownerId: userProfile.id,
                nickname: userProfile.nickname,
                image: userProfile.image,
                experience: userProfile.experience,
                point: userProfile.point,
                tier: userProfile.tier_id,
                favorites: categories,
                creationDate: Util.getDateString(userProfile.created_at)
            };
        },

        async myCoupons(parent, args, context, info) {
            const userCoupons = await ProfileService.getUserCoupons(context.user.id);

            if (userCoupons === null)
                return [];

            let coupons = [];
            for (let i of userCoupons) {
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
        },

        async coupons(parent, args, context, info) {
            const allCoupons = await ProfileService.getAllCoupons();
            let coupons = [];
            for (let i of allCoupons) {
                coupons.push({
                    id: i.id,
                    name: i.name,
                    explanation: i.explanation,
                    price: i.price
                });
            }
            return coupons;
        },

        async categories(parent, args, context, info) {
            const allCategories = await ProfileService.getAllCategories();
            let categories = [];
            for (let i of allCategories) {
                categories.push({
                    id: i.id,
                    name: i.name
                });
            }
            return categories;
        }
    },
    Mutation: {
        async updateProfile(parent, args, context, info) {
            const result1 = await ProfileService.updateNickname(context.user.id, args.name);
            const result2 = await ProfileService.updateCategory(context.user.id, args.favorite);
            return {
                code: 200,
                message: 'complete',
                success: result1 && result2
            };
        },
        updateProfileImg(parent, {file}) {
            /*
            const { createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream();
      
            const out = require('fs').createWriteStream(filename);
            stream.pipe(out);
            await finished(out);

            return { filename, mimetype, encoding };

             */
        }
    }
};

module.exports = profileResolver;