const Sequelize = require('sequelize');

module.exports = class Asking extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Asking',
            tableName: 'asking',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Asking.belongsTo(db.Question, { foreignKey: 'question_id', targetKey: 'id' }),
        db.Asking.belongsTo(db.User, { foreignKey: 'creator_id', targetKey: 'id' })
    }
};