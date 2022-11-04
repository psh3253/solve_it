const {Query, Mutation} = require('../../resolvers/question_verification');
const QuestionVerificationService = require("../../services/question_verification");
const assert = require("assert");

describe('get all reports', () => {
    // given
    const id = 1;
    const is_process = false;
    const type = 'SWEAR_WORD';
    const content = '내용 1';
    const creator_id = '아이디 1';
    const created_at = '2022-01-01T00:00:00.000Z';
    const expected_created_at = '2022-01-01 09:00:00';
    const test_id = 1;

    QuestionVerificationService.getAllReports = jest.fn((page) => {
        if (page !== 1)
            return [];
        return [
            {
                id: id,
                is_process: is_process,
                type: type,
                content: content,
                creator_id: creator_id,
                test_id: test_id,
                created_at: created_at
            }
        ]
    });

    it('success', async () => {
        // when
        const reports = await Query.allReports(undefined, {page: 1}, undefined, undefined);

        // then
        expect(reports[0].id).toEqual(id);
        expect(reports[0].isProcess).toEqual(is_process);
        expect(reports[0].type).toEqual(type);
        expect(reports[0].content).toEqual(content);
        expect(reports[0].creationDate).toEqual(expected_created_at);
        expect(reports[0].ownerId).toEqual(creator_id);
        expect(reports[0].testId).toEqual(test_id);
    });

    it('fail', async () => {
        // when
        const reports = await Query.allReports(undefined, {page: 2}, undefined, undefined);

        // then
        expect(reports).toEqual([]);
    });
});

describe('get reports by type', () => {
    // given
    const id = 1;
    const is_process = false;
    const type = 'SWEAR_WORD';
    const content = '내용 1';
    const creator_id = '아이디 1';
    const created_at = '2022-01-01T00:00:00.000Z';
    const expected_created_at = '2022-01-01 09:00:00';
    const test_id = 1;

    QuestionVerificationService.getReportsByType = jest.fn((type) => {
        if (type !== 'SWEAR_WORD')
            return [];
        return [
            {
                id: id,
                is_process: is_process,
                type: type,
                content: content,
                creator_id: creator_id,
                test_id: test_id,
                created_at: created_at
            }
        ]
    });

    it('success', async () => {
        // when
        const reports = await Query.reportsByType(undefined, {type: 'SWEAR_WORD'}, undefined, undefined);

        // then
        expect(reports[0].id).toEqual(id);
        expect(reports[0].isProcess).toEqual(is_process);
        expect(reports[0].type).toEqual(type);
        expect(reports[0].content).toEqual(content);
        expect(reports[0].creationDate).toEqual(expected_created_at);
        expect(reports[0].ownerId).toEqual(creator_id);
        expect(reports[0].testId).toEqual(test_id);
    });

    it('fail', async () => {
        // when
        const reports = await Query.reportsByType(undefined, {type: 'ADVERTISEMENT'}, undefined, undefined);

        // then
        expect(reports).toEqual([]);
    });
});

describe('create a report', () => {
    // given
    const content = '내용 1';
    const test_id = 1;
    const type = 'SWEAR_WORD';
    const creator_id = '아이디 1';
    const context = {
        user: {
            id: creator_id
        }
    }
    QuestionVerificationService.createReport = jest.fn((content, test_id, type, creator_id) => {
        return !!(content && test_id && type && creator_id);
    });

    it('success', async () => {
        // when
        const result = await Mutation.createReport(undefined, {
            input: {
                content: content,
                testId: test_id,
                type: type
            }
        }, context, undefined);

        // then
        expect(result.code).toEqual(200);
        expect(result.success).toEqual(true);
        expect(result.message).toEqual('complete');
    });

    it('fail', async () => {
        // when
        const result = await Mutation.createReport(undefined, {
            input: {
                content: content,
                testId: test_id,
                type: null
            }
        }, context, undefined);

        // then
        expect(result.code).toEqual(200);
        expect(result.success).toEqual(false);
        expect(result.message).toEqual('complete');
    });
});

describe('delete a report', () => {
    // given
    const id = 1;
    const creator_id = '아이디 1';
    const context = {
        user: {
            id: creator_id
        }
    }
    QuestionVerificationService.deleteReport = jest.fn((id) => {
        return id === 1;
    });

    QuestionVerificationService.isReportCreator = jest.fn((id, creator_id) => {
        return (id === 1 && creator_id === '아이디 1');
    });

    it('success', async () => {
        // when
        const result = await Mutation.deleteReport(undefined, {id: id}, context, undefined);

        // then
        expect(result.code).toEqual(200);
        expect(result.success).toEqual(true);
        expect(result.message).toEqual('complete');
    });

    it('fail', async () => {
        // given
        context.user.id = "아이디 2";

        // when
        const result = await Mutation.deleteReport(undefined, {id: id}, context, undefined);

        // then
        expect(result.code).toEqual(200);
        expect(result.success).toEqual(false);
        expect(result.message).toEqual('not creator');
    });
});