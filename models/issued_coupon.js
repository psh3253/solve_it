const Sequelize = require('sequelize');

module.exports = class IssuedCoupon extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            code: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'IssuedCoupon',
            tableName: 'issued_coupon',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.IssuedCoupon.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'})
        db.IssuedCoupon.belongsTo(db.Coupon, {foreignKey: 'coupon_id', targetKey: 'id'})
    }
};