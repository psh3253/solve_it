const QuestionVerificationService = require('../../services/question_verification');
const Report = require('../../models/report');

describe('get all reports', () => {
    // given
    const id = 1;
    const type = 'SWEAR_WORD';
    const content = '내용';
    const is_process = false;
    const created_at = '2022-01-01T00:00:00.000Z';
    const creator_id = '아이디';
    const test_id = 1;

    Report.findAll = jest.fn().mockReturnValue([
        {
            id: id,
            type: type,
            content: content,
            is_process: is_process,
            created_at: created_at,
            creator_id: creator_id,
            test_id: test_id
        }
    ]);

    it('success', async () => {
        // when
        const reports = await QuestionVerificationService.getAllReports(1);

        // then
        expect(reports[0].id).toEqual(id);
        expect(reports[0].type).toEqual(type);
        expect(reports[0].content).toEqual(content);
        expect(reports[0].is_process).toEqual(is_process);
        expect(reports[0].created_at).toEqual(created_at);
        expect(reports[0].creator_id).toEqual(creator_id);
        expect(reports[0].test_id).toEqual(test_id);
    });
});

describe('get reports by type', () => {
    // given
    const id = 1;
    const type = 'SWEAR_WORD';
    const content = '내용';
    const is_process = false;
    const created_at = '2022-01-01T00:00:00.000Z';
    const creator_id = '아이디';
    const test_id = 1;

    Report.findAll = jest.fn().mockReturnValue([
        {
            id: id,
            type: type,
            content: content,
            is_process: is_process,
            created_at: created_at,
            creator_id: creator_id,
            test_id: test_id
        }
    ]);

    it('success', async () => {
        // when
        const reports = await QuestionVerificationService.getReportsByType('SWEAR_WORD');

        // then
        expect(reports[0].id).toEqual(id);
        expect(reports[0].type).toEqual(type);
        expect(reports[0].content).toEqual(content);
        expect(reports[0].is_process).toEqual(is_process);
        expect(reports[0].created_at).toEqual(created_at);
        expect(reports[0].creator_id).toEqual(creator_id);
        expect(reports[0].test_id).toEqual(test_id);
    });
});

describe('create a report', () => {
    // given
    const type = 'SWEAR_WORD';
    const content = '내용';
    const creator_id = '아이디';
    const test_id = 1;

    Report.create = jest.fn();

    it('success', async () => {
        // when
        const result = await QuestionVerificationService.createReport(content, test_id, type, creator_id);

        // then
        expect(result).toEqual(true);
    });
});

describe('check if the user is the creator of the report', () => {
    // given
    const report_id = 1;
    const creator_id = "아이디";

    Report.findOne = jest.fn().mockReturnValue({
        creator_id: creator_id
    });

    it('success', async () => {
        // when
        const result = await QuestionVerificationService.isReportCreator(report_id, creator_id);

        // then
        expect(result).toEqual(true);
    });

    it('fail: wrong id', async () => {
        // given
        const wrong_id = "아이디 2";

        // when
        const result = await QuestionVerificationService.isReportCreator(report_id, wrong_id)

        // then
        expect(result).toEqual(false);
    });
});

describe('delete a report', () => {
    // given
    Report.destroy = jest.fn();

    it('success', async () => {
        // when
        const result = await QuestionVerificationService.deleteReport(1);

        // then
        expect(result).toEqual(true);
    });
});