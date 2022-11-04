const questionVerificationService = {};
const Report = require('../models/report');

questionVerificationService.getAllReports = async (page) => {
    try {
        return await Report.findAll({
            attributes: ['id', 'type', 'content', 'is_process', 'created_at', 'creator_id', 'test_id'],
            limit: 10,
            offset: page - 1
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionVerificationService.getReportsByType = async (type) => {
    try {
        return await Report.findAll({
            attributes: ['id', 'type', 'content', 'is_process', 'created_at', 'creator_id', 'test_id'],
            where: {
                type: type
            }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

questionVerificationService.createReport = async (content, test_id, type, creator_id) => {
    try {
        sequelize.transaction(async (t) => {
            await Report.create({
                content: content,
                test_id: test_id,
                type: type,
                creator_id: creator_id
            });
            return true;
        });
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionVerificationService.isReportCreator = async (report_id, user_id) => {
    try {
        const report = await Report.findOne({
            attributes: ['creator_id'],
            where: {
                id: report_id,
            }
        });
        return report.creator_id === user_id;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionVerificationService.deleteReport = async (report_id) => {
    try {
        sequelize.transaction(async (t) => {
            await Report.destroy({
                where: {
                    id: report_id
                }
            })
            return true;
        });
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = questionVerificationService;