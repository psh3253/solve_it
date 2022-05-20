const Sequelize = require('sequelize');

module.exports = class Coupon extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            explanation: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Coupon',
            tableName: 'coupon',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Coupon.hasMany(db.IssuedCoupon, {foreginKey: 'coupon_id', sourceKey: 'id'})
    }
};