const Sequelize = require('sequelize');

module.exports = class AnswerSheet extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'AnswerSheet',
            tableName: 'answer_sheet',
            indexes: [{unique: true, fields: ['test_id', 'creator_id']}],
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.AnswerSheet.hasMany(db.AnswerRecord, {foreignKey: 'answer_sheet_id', sourceKey: 'id'});
        db.AnswerSheet.belongsTo(db.Test, {foreignKey: 'test_id', targetKey: 'id'});
        db.AnswerSheet.belongsTo(db.User, {foreignKey: 'creator_id', targetKey: 'id'});
    }
};