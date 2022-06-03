const Sequelize = require('sequelize');

module.exports = class Tier extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            tier_name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            required_experience: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Tier',
            tableName: 'tier',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Tier.hasMany(db.User, {foreignKey: 'tier_id', sourceKey: 'id'});
    }
};