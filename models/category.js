const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
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
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Category',
            tableName: 'category',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Category.hasMany(db.Question, {foreignKey: 'category_id', sourceKey: 'id'});
        db.Category.belongsToMany(db.User, {
            through: 'user_category',
            foreignKey: 'category_id',
            sourceKey: 'id',
            timestamps: false,
            onDelete: 'cascade'
        });
        db.Category.hasMany(db.Test, {foreignKey: 'category_id', sourceKey: 'id'});
    }
};