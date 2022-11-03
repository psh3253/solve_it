const Sequelize = require('sequelize');

module.exports = class CodingQuestionStatus extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            is_correct: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_process: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            test_case_idx: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Coding_Question_Status',
            tableName: 'coding_question_status',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.CodingQuestionStatus.belongsTo(db.AnswerRecord, {
            foreignKey: 'answer_record_id',
            targetKey: 'id',
            onDelete: 'cascade'
        });
        db.CodingQuestionStatus.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    }
};