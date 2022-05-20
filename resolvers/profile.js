const ProfileService = require('../services/profile');

const profileResolver = {
    Query: {
        getUserProfile(parent, args, context, info) {
            return ProfileService()
        }
    },
    Mutation: {
        updateMyCoupon(parent, args, context, info) {
            
        },
        updateInterests(user_id, category) {

        },
        updateUsername(user_id, category) {

        }
    }
};

module.exports = profileResolver;