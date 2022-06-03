const Sequelize = require('sequelize');

module.exports = class QuestionDifficulty extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'QuestionDifficulty',
            tableName: 'question_difficulty',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.QuestionDifficulty.belongsTo(db.Question, {foreignKey: 'question_id', targetKey: 'id', onDelete: 'cascade'});
        db.QuestionDifficulty.belongsTo(db.Difficulty, {foreignKey: 'difficulty_id', targetKey: 'id', onDelete: 'cascade'});
        db.QuestionDifficulty.belongsTo(db.User, {foreignKey: 'creator_id', targetKey: 'id'});
    }
};