const Sequelize = require('sequelize');

module.exports = class Test extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            try_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            private: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
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
            modelName: 'Test',
            tableName: 'test',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Test.hasMany(db.Report, {foreignKey: 'test_id', sourceKey: 'id', onDelete: 'cascade'});
        db.Test.belongsTo(db.User, { foreignKey: 'creator_id', targetKey: 'id' });
        db.Test.belongsToMany(db.User, {through: 'like', foreignKey: 'test_id', sourceKey: 'id', onDelete: 'cascade'});
        db.Test.hasMany(db.TestQuestion, {foreignKey: 'test_id', sourceKey: 'id', onDelete: 'cascade'});
        db.Test.belongsTo(db.Category, {foreignKey: 'category_id', targetKey: 'id'});
        db.Test.hasMany(db.TestTag, {foreignKey: 'test_id', sourceKey: 'id', onDelete: 'cascade'});
        db.Test.hasMany(db.AnswerSheet, {foreignKey: 'test_id', sourceKey: 'id', onDelete: 'null'})
    }
};