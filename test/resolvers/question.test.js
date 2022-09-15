const {Query, Mutation} = require('../../resolvers/question');
const QuestionService = require("../../services/question");

describe('get a question', () => {
    // given
    const id = 1;
    const title = '? œëª? 1';
    const content = '?‚´?š© 1';
    const type = 'MULTIPLE_CHOICE';
    const explanation = '?„¤ëª? 1';
    const difficulty = {
        name: '?‚œ?´?„ 1',
        experience: 100
    };
    const try_count = 10;
    const wrong_count = 5;
    const correct_count = 5;
    const category = {
        id: 1,
        name: 'ì¹´í…Œê³ ë¦¬ 1'
    }
    const answer_list = [
        {
            answer: 1
        }
    ]
    const candidate_list = [
        {
            number: 1,
            content: '?‚´?š© 1'
        }
    ]
    const expected_answer_list = [1];

    QuestionService.getQuestion = jest.fn((question_id) => {
            if (question_id !== 1)
                return null;
            return {
                id: id,
                title: title,
                content: content,
                type: type,
                explanation: explanation,
                correct_count: correct_count,
                try_count: try_count,
                Category: {
                    id: category.id,
                    name: category.name
                },
                Difficulty: {
                    name: difficulty.name,
                    experience: difficulty.experience
                }
            }
        }
    );
    QuestionService.getAnswer = jest.fn((question_id) => {
        if (question_id !== 1)
            return null;
        return answer_list;
    });
    QuestionService.getCandidate = jest.fn((question_id) => {
        if (question_id !== 1)
            return null;
        return candidate_list;
    })

    it('success', async () => {
        // when
        const data = await Query.question(undefined, {id: 1}, undefined, undefined);

        // then
        expect(data.id).toEqual(id);
        expect(data.name).toEqual(title);
        expect(data.paragraph).toEqual(content);
        expect(data.explanation).toEqual(explanation);
        expect(data.type).toEqual(type);
        expect(data.difficulty).toEqual(difficulty);
        expect(data.answerCnt).toEqual(try_count);
        expect(data.wrongCnt).toEqual(wrong_count);
        expect(data.questionCategory).toEqual(category);
        expect(data.answers).toEqual(expected_answer_list);
        expect(data.candidates).toEqual(candidate_list);
    });

    it('fail', async () => {
        // when
        const data = await Query.question(undefined, {id: 2}, undefined, undefined);

        // then
        expect(data).toEqual(null);
    })
});

describe('get a test', () => {
    // given
    const id = 1;
    const title = "? œëª? 1";
    const content = "?‚´?š© 1";
    const created_at = "2022-01-01T00:00:00.000Z";
    const expected_created_at = "2022-01-01 09:00:00";
    const try_count = 10;
    const is_private = 0;
    const creator_id = "?•„?´?”” 1";
    const like = 0;
    const category = {
        id: 1,
        name: "ì¹´í…Œê³ ë¦¬ 1"
    }
    const question_id_list = [
        {
            question_id: 1,
            number: 1
        }
    ]
    const expected_question_id_list = [
        {
            questionId: 1,
            number: 1
        }
    ]
    const tag_list = [
        {
            tag: "?ƒœê·? 1"
        }
    ]
    const expected_tag_list = [
        "?ƒœê·? 1"
    ]
    QuestionService.getTest = jest.fn((test_id, user_id) => {
        if (test_id !== 1)
            return null;
        return {
            id: id,
            title: title,
            content: content,
            try_count: try_count,
            created_at: created_at,
            category_id: category.id,
            is_private: is_private,
            creator_id: creator_id,
            dataValues: {
                like: like
            },
            Category: {
                id: category.id,
                name: category.name
            }
        }
    });

    QuestionService.getTestQuestions = jest.fn((test_id) => {
        return question_id_list;
    });

    QuestionService.getTestTags = jest.fn((test_id) => {
        return tag_list;
    });

    it('success', async () => {
        // when
        const data = await Query.test(undefined, {id: 1}, undefined, undefined)

        // then
        expect(data.id).toEqual(id);
        expect(data.name).toEqual(title);
        expect(data.content).toEqual(content);
        expect(data.creationDate).toEqual(expected_created_at);
        expect(data.tryCnt).toEqual(try_count);
        expect(data.is_private).toEqual(is_private);
        expect(data.like).toEqual(like);
        expect(data.testCategory).toEqual(category);
        expect(data.questionIds).toEqual(expected_question_id_list);
        expect(data.tag).toEqual(expected_tag_list);
    })
})