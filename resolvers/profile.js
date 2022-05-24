const {GraphQLUpload} = require('graphql-upload')
// const {finished} = require('stream/promises')
const ProfileService = require('../services/profile');
const Util = require('../util');

const profileResolver = {
    Upload: GraphQLUpload,
    Query: {
        async profile(parent, {ID}, context, info) {
            let targetID = ID;
            if (targetID === null) {
                console.log("targetID undefined")
                targetID = context.user.id;
            }
            console.log(targetID)
            console.log(context.user)
            const userProfile = await ProfileService.getUserProfile(targetID);
            const userCategories = await ProfileService.getUserCategories(targetID);
            let categories = [];

            for (let i of userCategories.Categories) {
                categories.push(i.name);
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
            const userCoupons = await ProfileService.getUserCoupons(context.user);
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
        updateMyCoupon(parent, args, context, info) {
            return ProfileService.updateMyCoupon(args.couponID)
        },
        updateProfile(parent, args, context, info) {
            return ProfileService.updateProfile(args.name, args.favorite)
        },
        updateProfileImg(parent, { file }) {
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