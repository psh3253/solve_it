const QuestionService = require('../services/question');
const QuestionSolvingService = require('../services/question_solving');
const QuestionVerificationService = require('../services/question_verification');
const Util = require('../util');

const QuestionVerificationResolver = {
    Query: {
        async allReports(parent, {page}, context, info) {
            const reports = await QuestionVerificationService.getAllReports(page);
            let report_list = [];
            for (let i of reports) {
                report_list.push({
                    id: i.id,
                    isProcess: i.is_process,
                    type: i.type,
                    content: i.content,
                    creationDate: Util.getDateString(i.created_at),
                    ownerId: i.creator_id,
                    testId: i.test_id
                });
            }
            return report_list;
        },

        async reportsByType(parent, {type}, context, info) {
            const reports = await QuestionVerificationService.getReportsByType(type);
            let report_list = [];
            for (let i of reports) {
                report_list.push({
                    id: i.id,
                    isProcess: i.is_process,
                    type: i.type,
                    content: i.content,
                    creationDate: Util.getDateString(i.created_at),
                    ownerId: i.creator_id,
                    testId: i.test_id
                });
            }
            return report_list;
        }
    },
    Mutation: {
        async createReport(parent, {input}, context, info) {
            return {
                code: 200,
                message: 'complete',
                success: await QuestionVerificationService.createReport(input.content, input.testId, input.type, context.user.id)
            }
        },

        async deleteReport(parent, {id}, context, info) {
            if (!await QuestionVerificationService.isReportCreator(id, context.user.id))
                return {
                    code: 200,
                    message: 'not creator',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: await QuestionVerificationService.deleteReport(id)
            }
        }
    }
}

module.exports = QuestionVerificationResolver;