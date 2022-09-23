const Sequelize = require('sequelize');

module.exports = class TestTag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            tag: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'TestTag',
            tableName: 'test_tag',
            indexes: [{
                unique: true,
                fields: ['tag', 'test_id', 'creator_id']
            }],
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.TestTag.belongsTo(db.Test, {foreignKey: 'test_id', targetKey: 'id', onDelete: 'cascade'});
        db.TestTag.belongsTo(db.User, {foreignKey: 'creator_id', targetKey: 'id'});
    }
};