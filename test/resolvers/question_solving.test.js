const {Query, Mutation} = require('../../resolvers/question_solving')
const questionSolvingService = require('../../services/question_solving')
const questionService = require('../../services/question')

const testContext = {user: {id: 'test@test.com', iat: 1663596166, exp: 1663668166}}

const testTestId = 0
const testUserId = 'test@test.com'
const testAnswerSheet = {
    id: 0,
    created_at: '2022-09-16 12:34:56',
    update_at: '2022-09-16 12:34:56',
    test_id: testTestId,
    creator_id: testUserId
}
const testTestQuestion = [
    {id: 0, number: 1, question_id: 0},
    {id: 0, number: 2, question_id: 1},
    {id: 0, number: 3, question_id: 3}
]
const testAnswerRecord = [
    {id: 0, answer: ['a1'], is_correct: true, question_id: 0},
    {id: 1, answer: ['a1'], is_correct: false, question_id: 1},
    {id: 2, answer: ['a1'], is_correct: false, question_id: 2},
]

const testAnswer = testAnswerRecord.map(x => x.answer)

const testTestAnswers = []

for (let i = 0; i < testAnswerRecord.length; ++i) {
    testTestAnswers.push({
        questionId: testAnswerRecord[i].question_id,
        correctAnswer: ['a' + (i + 1).toString()],
        myAnswer: testAnswerRecord[i].answer,
        is_correct: testAnswerRecord[i].is_correct,
    })
}

const testSolvingTests = [{
    id: 0,
    title: 'test_list',
    creator_id: testTestId,
    created_at: '2022-09-16 12:34:56',
    is_private: false,
    try_count: 1,
    like: 0,
    Category: {
        id: 3,
        name: 'SCIENCE'
    }
}]

const testTestList = [{
    id: 0,
    name: 'test_list',
    ownerId: testTestId,
    creationDate: '2022-09-16 12:34:56',
    is_private: false,
    tryCnt: 1,
    like: 0,
    testCategory: {
        id: 3,
        name: 'SCIENCE'
    }
}]

questionSolvingService.getAnswerRecords = jest.fn((test_id, user_id) => {
    if (test_id === testTestId && user_id === testUserId)
        return testAnswerRecord
    return null
})

questionService.getAnswer = jest.fn((question_id) => {
    for (let i = 0; i < testTestAnswers.length; ++i) {
        if (testTestAnswers[i].questionId === question_id)
            return [{answer: testTestAnswers[i].correctAnswer[0]}]
    }
    return null
})

questionSolvingService.getSolvingTests = jest.fn((user_id) => {
    if (user_id === testUserId)
        return testSolvingTests
    return null
})

describe('get correct answers and my answers in a test', () => {
    it('success', async () => {
        expect(await Query.testAnswers(undefined, {testId: testTestId}, testContext, undefined)).toEqual(testTestAnswers)
    })

    it('fail: answer records is null', async () => {
        expect(await Query.testAnswers(undefined, {testId: 1}, testContext, undefined)).toEqual([])
    })
})

describe('get my solved tests', () => {
    it('success', async () => {
        expect(await Query.mySolvingTests(undefined, undefined, testContext, undefined)).toEqual(testTestList)
    })

    it('fail: test list is empty', async () => {
        expect(await Query.mySolvingTests(undefined, undefined, {user: {id: 'aaa@abs.com'}}, undefined)).toEqual([])
    })
})