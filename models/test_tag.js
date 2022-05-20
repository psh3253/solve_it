const Sequelize = require('sequelize');

module.exports = class TestTag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            tag: {
                type: Sequelize.STRING(30),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'TestTag',
            tableName: 'test_tag',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.TestTag.belongsTo(db.Test, {foreignKey: 'test_id', sourceKey: 'id'});
    }
};