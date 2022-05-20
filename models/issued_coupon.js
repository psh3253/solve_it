const Sequelize = require('sequelize');

module.exports = class IssuedCoupon extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(50),
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
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'AnswerRecord',
            tableName: 'answer_record',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.IssuedCoupon.belongsTo(db.User, {foreginKey: 'user_id', targetKey: 'id'})
        db.IssuedCoupon.belongsTo(db.Coupon, {foreginKey: 'coupon_id', targetKey: 'id'})
    }
};