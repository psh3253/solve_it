const QuestionService = require('../../services/question');
const Question = require("../../models/question");

describe('get a question', () => {
    // given
    const id = 1;
    const content = '내용';
    const created_at = '2022-01-01T00:00:00.000Z';
    const creator_id = '아이디';
    const test_id = 1;

    Question.findOne = jest.fn().mockReturnValue({
        id: id,
        content: content,
        created_at: created_at,
        creator_id: creator_id,
        test_id: test_id
    });

    it('success', async () => {
        // when
        const question = await QuestionService.getQuestion(1);

        // then
        expect(question.id).toEqual(id);
        expect(question.content).toEqual(content);
        expect(question.created_at).toEqual(created_at);
        expect(question.creator_id).toEqual(creator_id);
        expect(question.test_id).toEqual(test_id);
    });
});