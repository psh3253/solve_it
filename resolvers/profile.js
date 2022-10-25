// const {GraphQLUpload} = require('graphql-upload')
const ProfileService = require('../services/profile');
const Util = require('../util');
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