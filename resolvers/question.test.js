const {Query, Mutation} = require('./question');
const QuestionService = require("../services/question");

describe('look up a question', () => {
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
            content: '내용 1'
        }
    ]
    const expected_answer_list = [1];

    QuestionService.getQuestion = jest.fn().mockImplementation((question_id) => {
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
    QuestionService.getAnswer = jest.fn().mockImplementation((question_id) => {
        return answer_list;
    });
    QuestionService.getCandidate = jest.fn().mockImplementation((question_id) => {
        return candidate_list;
    })

    it('success', async () => {

        // when
        const data = await Query.question(null, {id: 1}, null, null);

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

    it('fail', async() => {
        // when
        const data = await Query.question(null, {id: 2}, null, null);

        // then
        expect(data).toEqual(undefined);
    })

});