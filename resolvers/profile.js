const {GraphQLUpload} = require('graphql-upload')
const {finished} = require('stream/promises')
const ProfileService = require('../services/profile');

const profileResolver = {
    Upload: GraphQLUpload,
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
        updateProfileImg(parent, { file }) {
            const { createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream();
      
            const out = require('fs').createWriteStream(filename);
            stream.pipe(out);
            await finished(out);
      
            return { filename, mimetype, encoding };
        }
    }
};

module.exports = profileResolver;