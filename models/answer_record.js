const Sequelize = require('sequelize');

module.exports = class AnswerRecord extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            answer: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            is_correct: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'AnswerRecord',
            tableName: 'answer_record',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.AnswerRecord.belongsTo(db.AnswerSheet, {foreignKey: 'answer_sheet_id', targetKey: 'id'});
        db.AnswerRecord.belongsTo(db.TestQuestion, {foreignKey: 'test_question_id', targetKey: 'id'});
        db.AnswerRecord.belongsTo(db.Question, {foreignKey: 'question_id', targetKey: 'id'});
    }
};