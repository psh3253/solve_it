const Sequelize = require('sequelize');

module.exports = class QuestionCandidate extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            number: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'QuestionCandidate',
            tableName: 'question_candidate',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.QuestionCandidate.belongsTo(db.Question, {foreignKey: 'question_id', targetKey: 'id', onDelete: 'cascade'})
    }
};