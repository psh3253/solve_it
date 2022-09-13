const authResolver = require('./auth')
const AuthService = require('../services/auth')

const testId = 'id'
const testPw = 'password'

AuthService.login = jest.fn().mockImplementation((ID, hashedPW) => {
    return ID === testId && hashedPW === testPw;
})

describe('auth', () => {
    it('login success', () => {
        expect(authResolver.Query.login(undefined, {ID: testId, hashedPW: testPw}, undefined, undefined)).toEqual(true)
    });

    it('login failed', () => {
        expect(authResolver.Query.login(undefined, {ID: 'aaa', hashedPW: 'password'}, undefined, undefined)).toEqual(false)
    });
});
