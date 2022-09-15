const { Query, Mutation } = require('../../resolvers/profile')
const profileService = require('../../services/profile')
const Util = require('../../util')

const testCategory = [
    {id: 0, name: 'korean'},
    {id: 1, name: 'english'},
    {id: 2, name: 'math'},
]

const testProfile = {
    ownerId: 'testId',
    nickname: 'testName',
    image: undefined,
    experience: 100,
    point: 200,
    tier: 3,
    favorites: [testCategory[0], testCategory[1]],
    creationDate: Util.getDateString('2022-09-14 11:23:34')
};

const testCoupons = [ { count: 0, Coupon: { id: 0, name: 'coupon 1', explanation: 'test coupon 1', price: 100 }},
                    { count: 1, Coupon: { id: 1, name: 'coupon 2', explanation: 'test coupon 2', price: 200 }},
                    { count: 2, Coupon: { id: 2, name: 'coupon 3', explanation: 'test coupon 3', price: 300 }}]

const testContext = {
    user: {
        id: 'testId'
    }
}

profileService.getUserProfile = jest.fn((targetId) => {
    if (targetId === testProfile.ownerId)
        return {
            id: testProfile.ownerId,
            nickname: testProfile.nickname,
            experience: testProfile.experience,
            point: testProfile.point,
            created_at: '2022-09-14 11:23:34',
            tier_id: 3
        }

    return null
})

profileService.getUserCategories = jest.fn((targetId) => {
    if (targetId === testProfile.ownerId)
        return { Categories: testProfile.favorites }
    
    return null
})

profileService.getUserCoupons = jest.fn((user_id) => {
    if (user_id === testProfile.ownerId)
        return testCoupons
    return null
})

profileService.getAllCoupons = jest.fn(() => {
    const allCoupons = []

    for (let coupons of testCoupons) {
        allCoupons.push(coupons.Coupon)
    }

    return allCoupons
})

profileService.getAllCategories = jest.fn(() => {
    return testCategory
})

describe('get profile', () => {
    it('success', async () => {
        const profile = await Query.profile(undefined, {ID: testProfile.ownerId}, undefined, undefined)
        expect(profile).toEqual(testProfile)
    })

    // ? resolver에서 profile이 null이라면?
    it('fail: profile not found', async () => {

    })
})

describe('get coupons', () => {
    it('myCoupons: success', async () => {
        const coupons = await Query.myCoupons(undefined, undefined, testContext, undefined)
        let i = 0

        for (const coupon of coupons) {
            expect(coupon.count).toEqual(testCoupons[i].count)
            expect(coupon.coupon).toEqual(testCoupons[i].Coupon)
            i++
        }
    })

    it('coupons: success', async () => {
        const coupons = await Query.coupons(undefined, undefined, undefined, undefined)
        let i = 0

        for (const coupon of coupons) {
            expect(coupon).toEqual(testCoupons[i].Coupon)
            i++
        }
    })
})

describe('get categories', () => {
    it('success', async () => {
        expect(await Query.categories()).toEqual(testCategory)
    })
})

// TODO: need to implement
/**
describe('update my coupon', () => {
    it('success', async () => {

    })
})
 */

describe('update profile', () => {
    it('success', async () => {
        
    })
})