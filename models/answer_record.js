const Sequelize = require('sequelize');

module.exports = class AnswerRecord extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            answer: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            is_correct: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            language: {
                type: Sequelize.STRING(10),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'AnswerRecord',
            tableName: 'answer_record',
            indexes: [{ unique: true, fields: ['answer_sheet_id', 'question_id'] }],
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