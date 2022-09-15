const { Query, Mutation } = require('../../resolvers/auth')
const AuthService = require('../../services/auth')

const testId = 'id'
const testPw = 'password'
const testName = 'name'

AuthService.login = jest.fn((id, hashedPW) => {
    return id === testId && hashedPW === testPw
})

AuthService.signup = jest.fn((id, password, nickname) => {
    return id !== undefined && password !== undefined && nickname !== undefined
})

describe('login', () => {
    it('login success', () => {
        expect(Query.login(undefined, {ID: testId, hashedPW: testPw}, undefined, undefined)).toEqual(true)
    });

    it('login failed: id does not exist', () => {
        expect(Query.login(undefined, {ID: 'wrongid', hashedPW: testPw}, undefined, undefined)).toEqual(false)
    });

    it('login failed: password not match', () => {
        expect(Query.login(undefined, {ID: testId, hashedPW: 'wrongpw'}, undefined, undefined)).toEqual(false)
    });
});

describe('signup', () => {
    it('signup success', () => {
        const signupResponse = Mutation.signup(undefined, {ID: testId, hashedPW: testPw, name: testName}, undefined, undefined)

        expect(signupResponse.code).toEqual(200)
        expect(signupResponse.message).toEqual('hello')
        expect(signupResponse.success).toEqual(true)
    })

    it('signup fail: id undefined', () => {
        const signupResponse = Mutation.signup(undefined, {ID: undefined, hashedPW: testPw, name: testName}, undefined, undefined)
        
        expect(signupResponse.success).toEqual(false)
    })
})