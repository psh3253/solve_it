const { Query, Mutation } = require('../../resolvers/question_solving')
const questionSolvingService = require('../../services/question_solving')

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
    { id: 0, number: 1, question_id: 0 },
    { id: 0, number: 2, question_id: 1 },
    { id: 0, number: 3, question_id: 3 }
]
const testAnswerRecord = [
    { id: 0, answer: 'a1', is_correct: true, question_id: 0 },
    { id: 1, answer: 'a1', is_correct: false, question_id: 1 },
    { id: 2, answer: 'a1', is_correct: true, question_id: 2 },
]

const testTestAnswers = [
    { question_id: testAnswerRecord[0].id, correctAnswer: 'a1', myAnswer: testAnswerRecord[0].answer}
]

questionSolvingService.getAnswerSheet = jest.fn((test_id, user_id) => {
    if (test_id === testTestId && user_id === testUserId)
        return testAnswerSheet
    return null
})

questionSolvingService.getAllTestQuestion = jest.fn((test_id) => {
    if (test_id === testTestId)
        return testTestQuestion
    return null
})

questionSolvingService.getAnswerRecords = jest.fn((test_id, user_id) => {
    if (test_id === testTestId && user_id === testUserId)
        return testAnswerRecord
    return null
})

describe('get answers on a test', () => {

})