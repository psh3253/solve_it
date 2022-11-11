const Sequelize = require('sequelize');

module.exports = class QuestionAnswer extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            answer: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'QuestionAnswer',
            tableName: 'question_answer',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.QuestionAnswer.belongsTo(db.Question, {foreignKey: 'question_id', sourceKey: 'id', onDelete: 'cascade'});
    }
};