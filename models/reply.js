const Sequelize = require('sequelize');

module.exports = class Reply extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
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
            modelName: 'Reply',
            tableName: 'reply',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Reply.belongsTo(db.Asking, { foreignKey: 'asking_id', targetKey: 'id', onDelete: 'cascade' });
        db.Reply.belongsTo(db.User, { foreignKey: 'creator_id', targetKey: 'id' });
    }
};