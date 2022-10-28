const CouponService = require('../../services/coupon');
const Coupon = require('../../models/coupon');
const IssuedCoupon = require("../../models/issued_coupon");
const User = require("../../models/user");

describe('add a coupon', () => {
    // given
    const name = '쿠폰 이름';
    const explanation = '쿠폰 설명';
    const price = 1000;

    Coupon.create = jest.fn();

    it('success', async () => {
        // when
        const result = await CouponService.addCoupon(name, explanation, price);

        // then
        expect(result).toEqual(true);
    });
});

describe('delete a coupon', () => {
    // given
    const coupon_id = 1;

    Coupon.destroy = jest.fn();

    it('success', async () => {
        // when
        const result = await CouponService.deleteCoupon(coupon_id);

        // then
        expect(result).toEqual(true);
    });
});

describe('get all coupons', () => {
    // given
    const id = 1;
    const name = '쿠폰 이름';
    const explanation = '쿠폰 설명';
    const price = 1000;

    Coupon.findAll = jest.fn().mockReturnValue([{
        id: id,
        name: name,
        explanation: explanation,
        price: price
    }]);

    it('success', async () => {
        // when
        const result = await CouponService.getAllCoupons();

        // then
        expect(result[0].id).toEqual(id);
        expect(result[0].name).toEqual(name);
        expect(result[0].explanation).toEqual(explanation);
        expect(result[0].price).toEqual(price);
    });
});

describe('get my coupons', () => {
    // given
    const id = 1;
    const name = '쿠폰 이름';
    const explanation = '쿠폰 설명';
    const price = 1000;
    const count = 1;
    const created_at = '22022-01-01T00:00:00.000Z';
    const last_used_at = '2022-01-01T00:00:00.000Z';
    const user_id = '아이디';

    IssuedCoupon.findAll = jest.fn().mockReturnValue([{
        count: count,
        coupon_id: id,
        created_at: created_at,
        last_used_at: last_used_at,
        coupon: {
            id: id,
            name: name,
            explanation: explanation,
            price: price
        },
    }]);

    it('success', async () => {
        // when
        const result = await CouponService.getUserCoupons(user_id);

        // then
        expect(result[0].count).toEqual(count);
        expect(result[0].coupon_id).toEqual(id);
        expect(result[0].created_at).toEqual(created_at);
        expect(result[0].last_used_at).toEqual(last_used_at);
        expect(result[0].coupon.id).toEqual(id);
        expect(result[0].coupon.name).toEqual(name);
        expect(result[0].coupon.explanation).toEqual(explanation);
        expect(result[0].coupon.price).toEqual(price);
    });
});

describe('issue some coupons', () => {
    // given
    const user_id = '아이디';
    const coupon_id = 1;
    const count = 1;

    IssuedCoupon.create = jest.fn();
    User.update = jest.fn();
    Coupon.findOne = jest.fn().mockReturnValue({
        price: 1000
    });

    it('success', async () => {
        // given
        User.findOne = jest.fn().mockReturnValue({
            point: 1000
        });

        // when
        const result = await CouponService.issueCoupon(user_id, coupon_id, count);

        // then
        expect(result).toEqual(true);
    });

    it('fail', async () => {
        // given
        User.findOne = jest.fn().mockReturnValue({
            point: 500
        });

        // when
        const result = await CouponService.issueCoupon(user_id, coupon_id, count);

        // then
        expect(result).toEqual(false);
    });
});

describe('use a coupon', () => {
    // given
    const user_id = '아이디';
    const coupon_id = 1;

    IssuedCoupon.update = jest.fn();

    it('success', async () => {
        // given
        IssuedCoupon.findOne = jest.fn().mockReturnValue({
            count: 1
        });

        // when
        const result = await CouponService.useCoupon(user_id, coupon_id);

        // then
        expect(result).toEqual(true);
    });

    it('fail', async () => {
        // given
        IssuedCoupon.findOne = jest.fn().mockReturnValue({
            count: 0
        });

        // when
        const result = await CouponService.useCoupon(user_id, coupon_id);

        // then
        expect(result).toEqual(false);
    });
});