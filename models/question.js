const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            type: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            answer: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            explanation:  {
                type: Sequelize.TEXT,
                allowNull: true
            },
            correct_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            try_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Question',
            tableName: 'question',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Question.hasMany(db.CodingQuestionTestCase, {foreignKey: 'question_id', sourceKey: 'id'})
        db.Question.belongsTo(db.Difficulty, {foreignKey: 'difficulty_id', targetKey: 'id'});
        db.Question.belongsTo(db.Category, {foreignKey: 'category_id', targetKey: 'id'});
        db.Question.belongsTo(db.User, {foreignKey: 'creator_id', targetKey: 'id'});
        db.Question.hasMany(db.TestQuestion, {foreignKey: 'question_id', sourceKey: 'id'});
        db.Question.belongsTo(db.Test, {foreignKey: 'test_id', targetKey: 'id'});
        db.Question.hasMany(db.AnswerRecord, {foreignKey: 'question_id', sourceKey: 'id'});
        db.Question.hasMany(db.QuestionAnswer, {foreignKey: 'question_id', sourceKey: 'id'});
        db.Question.hasMany(db.QuestionCandidate, {foreignKey: 'question_id', sourceKey: 'id'});
    }
};