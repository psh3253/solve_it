const ProfileService = require('../services/profile');

const profileResolver = {
    Query: {
        getUserProfile(parent, args, context, info) {
            return ProfileService.getUserProfile(args.ID)
        }
    },
    Mutation: {
        updateMyCoupon(parent, args, context, info) {
            return ProfileService.updateMyCoupon(args.couponID)
        },
        updateProfile(parent, args, context, info) {
            return ProfileService.updateProfile(args.name, args.favorite)
        },
        updateProfileImg(parent, args, context, info) {
            //graphql-upload 패키지 적용
        }
    }
};

module.exports = profileResolver;