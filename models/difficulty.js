const Sequelize = require('sequelize');

module.exports = class Difficulty extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            experience: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Difficulty',
            tableName: 'difficulty',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Difficulty.hasMany(db.Question, {foreignKey: 'difficulty_id', sourceKey: 'id'});
    }
};