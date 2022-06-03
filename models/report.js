const Sequelize = require('sequelize');

module.exports = class Report extends Sequelize.Model {
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
            is_process: { // ??
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Report',
            tableName: 'report',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Report.belongsTo(db.Test, { foreignKey: 'test_id', targetKey: 'id', onDelete: 'cascade'});
        db.Report.belongsTo(db.User, { foreignKey: 'creator_id', targetKey: 'id' });
    }
};