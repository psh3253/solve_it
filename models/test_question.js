const Sequelize = require('sequelize');

module.exports = class TestQuestion extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            number: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'TestQuestion',
            tableName: 'test_question',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.TestQuestion.hasMany(db.AnswerRecord, {foreignKey: 'test_question_number', sourceKey: 'number'});
        db.TestQuestion.belongsTo(db.Test, {foreignKey: 'test_id', targetKey: 'id'});
        db.TestQuestion.belongsTo(db.Question, {foreignKey: 'question_id', targetKey: 'id'});
    }
};