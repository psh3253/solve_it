const authResolver = require('./auth')
const AuthService = require('../services/auth')

const testId = 'id'
const testPw = 'password'

AuthService.login = jest.fn().mockImplementation((ID, hashedPW) => {
    if (ID == testId && hashedPW == testPw)
        return true
    else
        return false
})

describe('auth', () => {
    it('login success', () => {
        expect(authResolver.Query.login(undefined, {ID: testId, hashedPW: testPw})).toBe(true)
    });

    it('login failed', () => {
        expect(authResolver.Query.login('aaa', 'password')).toBe(false)
    });
});
