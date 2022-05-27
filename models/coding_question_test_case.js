const Sequelize = require('sequelize');

module.exports = class CodingQuestionTestCase extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            input: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            output: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Coding_Question_Test_Case',
            tableName: 'coding_question_test_case',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.CodingQuestionTestCase.belongsTo(db.Question, {foreignKey: 'question_id', targetKey: 'id', onDelete: 'cascade'});
    }
};