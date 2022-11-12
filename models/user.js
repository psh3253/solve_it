const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(30),
                allowNull: false,
                primaryKey: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            image_url: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            experience: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            point: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            role: {
                /** User: 0, Administrator: 1 */
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'User',
            tableName: 'user',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.AnswerSheet, {foreignKey: 'creator_id', sourceKey: 'id'});
        db.User.hasMany(db.Report, {foreignKey: 'creator_id', sourceKey: 'id'});
        db.User.hasMany(db.Test, {foreignKey: 'creator_id', sourceKey: 'id'});
        db.User.belongsTo(db.Tier, {foreignKey: 'tier_id', targetKey: 'id'});
        db.User.belongsToMany(db.Test, {
            through: 'like',
            foreignKey: 'creator_id',
            sourceKey: 'id',
            onDelete: 'cascade'
        });
        db.User.hasMany(db.Question, {foreignKey: 'creator_id', sourceKey: 'id'});
        db.User.hasMany(db.ReviewNote, {foreignKey: 'creator_id', sourceKey: 'id'});
        db.User.hasMany(db.Asking, {foreignKey: 'creator_id', sourceKey: 'id'});
        db.User.hasMany(db.Reply, {foreignKey: 'creator_id', sourceKey: 'id'});
        db.User.belongsToMany(db.Category, {
            through: 'user_category',
            foreignKey: 'user_id',
            sourceKey: 'id',
            timestamps: false,
            onDelete: 'cascade'
        });
        db.User.hasMany(db.IssuedCoupon, {foreignKey: 'user_id', sourceKey: 'id'});
        db.User.hasMany(db.QuestionDifficulty, {foreignKey: 'creator_id', sourceKey: 'id'});
        db.User.hasMany(db.TestTag, {foreignKey: 'creator_id', sourceKey: 'id', onDelete: 'cascade'});
        db.User.hasMany(db.CodingQuestionStatus, {foreignKey: 'user_id', sourceKey: 'id'});
    }
};