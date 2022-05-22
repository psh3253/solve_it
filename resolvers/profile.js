const {GraphQLUpload} = require('graphql-upload')
const {finished} = require('stream/promises')
const ProfileService = require('../services/profile');
const Util = require('../util');

const profileResolver = {
    Upload: GraphQLUpload,
    Query: {
        async profile(parent, args, context, info) {
            const userProfile = await ProfileService.getUserProfile(args.ID);
            const userCategories = await ProfileService.getUserCategories(args.ID);
            let categories = [];
            for(let i of userCategories.Categories)
            {
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
                coupons: {

                },
                creationDate: Util.getDateString(userProfile.created_at)
            };
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