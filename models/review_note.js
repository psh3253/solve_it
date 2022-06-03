const Sequelize = require('sequelize');

module.exports = class ReviewNote extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            explanation: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'ReviewNote',
            tableName: 'review_note',
            indexes: [{ unique: true, fields: ['creator_id', 'question_id'] }],
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.ReviewNote.belongsTo(db.User, {foreignKey: 'creator_id', targetKey: 'id'});
        db.ReviewNote.belongsTo(db.Question, {foreignKey: 'question_id', targetKey: 'id'});
    }
};