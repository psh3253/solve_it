const ProfileService = require('../services/profile');
const Util = require('../util');
const AuthService = require("../services/auth");
const dotenv = require("dotenv");

dotenv.config();

const profileResolver = {
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
                image: userProfile.image_url,
                experience: userProfile.experience,
                point: userProfile.point,
                tier: userProfile.tier_id,
                favorites: categories,
                role: userProfile.role,
                creationDate: Util.getDateString(userProfile.created_at)
            };
        },

        async profilesByExp(parent, {page}, context, info) {
            if (page < 1)
                return [];
            
            const profiles = await ProfileService.getUserProfilesByExp(page);
            const profile_list = [];

            for (let profile of profiles) {
                profile_list.push({
                    ownerId: profile.id,
                    nickname: profile.nickname,
                    experience: profile.experience,
                    tier: profile.tier_id,
                })
            }

            return profile_list;
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

        async lambdaUploadProfileImg(parent, {awsRegion, fileName, fileExtension, userId}, context, info) {
            if (awsRegion !== process.env.AWS_REGION)
                return {
                    code: 200,
                    message: 'failed',
                    success: false
                }

            const decoded_file_name = decodeURIComponent(fileName);
            
            if (["png", "jpg", "jpeg"].includes(fileExtension)) {
                const imageUrl = process.env.S3_BUCKET_URL + process.env.S3_IMAGE_DIRECTORY_PATH + "/" + decoded_file_name + '.' + fileExtension;
                const result = await ProfileService.updateProfileImg(userId, imageUrl);

                return {
                    code: 200,
                    message: 'complete',
                    success: result
                }
            }

            return {
                code: 200,
                message: 'unsupported file extension',
                success: result
            }
        }
    }
};

module.exports = profileResolver;