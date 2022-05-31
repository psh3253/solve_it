const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model {
    static init(sequelize) {
        return super.init({},{
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Like',
            tableName: 'like',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Like.belongsTo(db.User, {foreignKey: 'creator_id', sourceKey: 'id'})
        db.Like.belongsTo(db.Test, {foreignKey: 'test_id', sourceKey: 'id'})
    }
};