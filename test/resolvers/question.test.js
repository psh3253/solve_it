const {Query, Mutation} = require('../../resolvers/question');
const QuestionService = require("../../services/question");

describe('get a question', () => {
    // given
    const id = 1;
    const title = '제목 1';
    const content = '내용 1';
    const type = 'MULTIPLE_CHOICE';
    const explanation = '설명 1';
    const difficulty = {
        name: '난이도 1',
        experience: 100
    };
    const try_count = 10;
    const wrong_count = 5;
    const correct_count = 5;
    const category = {
        id: 1,
        name: '카테고리 1'
    }
    const answer_list = [
        {
            answer: 1
        }
    ]
    const candidate_list = [
        {
            number: 1,
            content: '후보지 1'
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
    const title = "제목 1";
    const content = "내용 1";
    const created_at = "2022-01-01T00:00:00.000Z";
    const expected_created_at = "2022-01-01 09:00:00";
    const try_count = 10;
    const is_private = 0;
    const creator_id = "아이디 1";
    const like = 0;
    const category = {
        id: 1,
        name: "카테고리 1"
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
            tag: "태그 1"
        }
    ]
    const expected_tag_list = [
        "태그 1"
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
});

describe('get all tests', () => {
    // given
    const id = 1;
    const title = "제목 1";
    const created_at = "2022-01-01T00:00:00.000Z";
    const expected_created_at = "2022-01-01 09:00:00";
    const try_count = 10;
    const is_private = 0;
    const creator_id = "아이디 1";
    const like = 0;
    const category = {
        id: 1,
        name: "카테고리 1"
    }

    QuestionService.getAllTests = jest.fn((page, order) => {
        if (page !== 1)
            return null;
        return [
            {
                id: id,
                title: title,
                try_count: try_count,
                created_at: created_at,
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
        ]
    });

    it('success', async () => {
        // when
        const data = await Query.allTests(undefined, {page: 1, order: "DATE"}, undefined, undefined)

        // then
        expect(data[0].id).toEqual(id);
        expect(data[0].name).toEqual(title);
        expect(data[0].ownerId).toEqual(creator_id);
        expect(data[0].creationDate).toEqual(expected_created_at);
        expect(data[0].tryCnt).toEqual(try_count);
        expect(data[0].is_private).toEqual(is_private);
        expect(data[0].like).toEqual(like);
        expect(data[0].testCategory).toEqual(category);
    });
});

describe('get tests by category', () => {
    // given
    const id = 1;
    const title = "제목 1";
    const created_at = "2022-01-01T00:00:00.000Z";
    const expected_created_at = "2022-01-01 09:00:00";
    const try_count = 10;
    const is_private = 0;
    const creator_id = "아이디 1";
    const like = 0;
    const category = {
        id: 1,
        name: "카테고리 1"
    }

    QuestionService.getTestsByCategoryId = jest.fn((category_id) => {
        if (category_id !== 1)
            return null;
        return [
            {
                id: id,
                title: title,
                try_count: try_count,
                created_at: created_at,
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
        ]
    });

    it('success', async () => {
        // when
        const data = await Query.testsByCategory(undefined, {id: 1}, undefined, undefined)

        // then
        expect(data[0].id).toEqual(id);
        expect(data[0].name).toEqual(title);
        expect(data[0].ownerId).toEqual(creator_id);
        expect(data[0].creationDate).toEqual(expected_created_at);
        expect(data[0].tryCnt).toEqual(try_count);
        expect(data[0].is_private).toEqual(is_private);
        expect(data[0].like).toEqual(like);
        expect(data[0].testCategory).toEqual(category);
    });
});

describe('create a question', () => {
    // given
    const id = 1;
    const title = "제목 1";
    const content = "내용 1";
    const creator_id = "아이디 1";
    const explanation = "설명 1";
    const type = "MULTIPLE_CHOICE"
    const difficulty = 1;
    const category = {
        id: 1,
        name: "카테고리 1"
    }
    const answers = ["정답 1"];
    const candidates = ["후보 1"];
    const context = {
        user: {
            id: creator_id
        }
    }

    QuestionService.createQuestion = jest.fn((title, content, answers, explanation, type, category_id, creator_id, difficulty_id, candidates) => {
        if(title && content && answers && explanation && type && category_id && creator_id && difficulty_id && candidates)
            return id;
        return null;
    });

    it('success', async () => {
        // when
        const result = await Mutation.createQuestion(undefined, {input: {
            name: title,
            paragraph: content,
            answers: answers,
            explanation: explanation,
            type: type,
            questionCategory: category.id,
            questionDifficulty: difficulty,
            candidates: candidates
        }}, context, undefined);

        // then
        expect(result.code).toEqual(200);
        expect(result.success).toEqual(true);
        expect(result.message).toEqual("complete");
        expect(result.questionId).toEqual(id);
    });
});