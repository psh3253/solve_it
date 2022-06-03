const questionVerificationService = {};
const Report = require('../models/report');

questionVerificationService.createReport = async(content, test_id, creator_id) => {
    try {
        await Report.create({
            content: content,
            test_id: test_id,
            creator_id: creator_id
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

questionVerificationService.isReportCreator = async(report_id, user_id) => {
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

questionVerificationService.deleteReport = async(report_id) => {
    try {
        await Report.destroy({
            where: {
                id: report_id
            }
        })
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}


module.exports = questionVerificationService;