const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(30),
                allowNull: false,
                primaryKey: true,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(30),
                allowNull: false,
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
            modelName: 'User',
            tableName: 'user',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // Relation
    }
};