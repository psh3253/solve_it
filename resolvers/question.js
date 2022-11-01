const QuestionService = require('../services/question');
const Util = require('../util');

const QuestionResolver = {
    Question: {
        __resolveType: (question) => {
            if (question.type === "MULTIPLE_CHOICE")
                return "MultipleChoice"
            else if (question.type === "CODING_TEST")
                return "CodingTest"
            else
                return "Other"
        }
    },
    Query: {
        async question(parent, {id}, context, info) {
            const question = await QuestionService.getQuestion(id);
            if (question === null)
                return null;
            const answers = await QuestionService.getAnswer(id);
            const candidates = await QuestionService.getCandidate(id);
            const wrong_count = question.try_count - question.correct_count
            const test_cases = await QuestionService.getTestCase(id);
            let answer_list = [];
            let candidate_list = [];
            let test_case_list = [];

            for (let i of answers) {
                answer_list.push(i.answer)
            }
            for (let i of candidates) {
                candidate_list.push({
                    number: i.number,
                    content: i.content
                })
            }
            for (let i of test_cases) {
                test_case_list.push({
                    input: i.input,
                    output: i.output
                })
            }

            return {
                id: question.id,
                name: question.title,
                paragraph: question.content,
                answers: answer_list,
                explanation: question.explanation,
                type: question.type,
                difficulty: question.Difficulty,
                answerCnt: question.try_count,
                wrongCnt: wrong_count,
                questionCategory: question.Category,
                candidates: candidate_list,
                testCases: test_case_list
            };
        },

        async test(parent, {id}, context, info) {
            const test = await QuestionService.getTest(id, context.user.id);
            if (test === null)
                return null;
            const test_question_ids = await QuestionService.getTestQuestions(id);
            const test_tags = await QuestionService.getTestTags(id);

            let question_id_list = [];

            for (let i of test_question_ids) {
                question_id_list.push({
                    questionId: i.question_id,
                    number: i.number
                });
            }

            const tag_list = [];
            for (let tag of test_tags) {
                tag_list.push({
                    id: tag.id,
                    name: tag.tag,
                    ownerId: tag.creator_id,
                    creationDate: Util.getDateString(tag.created_at),
                    testId: tag.test_id
                })
            }

            return {
                id: test.id,
                name: test.title,
                content: test.content,
                ownerId: test.creator_id,
                creationDate: Util.getDateString(test.created_at),
                tryCnt: test.try_count,
                isPrivate: test.is_private,
                like: test.dataValues.like,
                testCategory: {
                    id: test.Category.id,
                    name: test.Category.name
                },
                questionIds: question_id_list,
                tag: tag_list,
            }
        },

        async allTests(parent, {page, order}, context, info) {
            const tests = await QuestionService.getAllTests(page, order);
            let test_list = [];
            for (let i of tests) {
                test_list.push({
                    id: i.id,
                    name: i.title,
                    ownerId: i.creator_id,
                    creationDate: Util.getDateString(i.created_at),
                    is_private: i.is_private,
                    tryCnt: i.try_count,
                    like: i.dataValues.like,
                    testCategory: {
                        id: i.Category.id,
                        name: i.Category.name
                    }
                });
            }
            return test_list;
        },

        async testsByCategory(parent, {id}, context, info) {
            const tests = await QuestionService.getTestsByCategoryId(id);
            let test_list = [];
            for (let i of tests) {
                test_list.push({
                    id: i.id,
                    name: i.title,
                    ownerId: i.creator_id,
                    creationDate: Util.getDateString(i.created_at),
                    is_private: i.is_private,
                    tryCnt: i.try_count,
                    like: i.dataValues.like,
                    testCategory: {
                        id: i.Category.id,
                        name: i.Category.name
                    }
                });
            }
            return test_list;
        },

        async testsByCreator(parent, {id}, context, info) {
            const tests = await QuestionService.getTestsByCreatorId(id);
            let test_list = [];
            for (let i of tests) {
                test_list.push({
                    id: i.id,
                    name: i.title,
                    ownerId: i.creator_id,
                    creationDate: Util.getDateString(i.created_at),
                    is_private: i.is_private,
                    tryCnt: i.try_count,
                    like: i.dataValues.like,
                    testCategory: {
                        id: i.Category.id,
                        name: i.Category.name
                    }
                });
            }
            return test_list;
        }
    },
    Mutation: {
        async createQuestion(parent, {input}, context, info) {
            const question_id = await QuestionService.createQuestion(input.name, input.paragraph, input.answers, input.explanation, input.type, input.questionCategory, context.user.id, input.questionDifficulty, input.candidates);
            return {
                code: 200,
                message: 'complete',
                success: question_id > 0,
                questionId: question_id
            }
        },

        async uploadQuestionMediaFile(parent, {awsRegion, eventTime, fileName, fileSize}, context, info) {
            if (awsRegion !== process.env.AWS_REGION)
                return {
                    code: 200,
                    message: 'failed',
                    success: false
                }
            
            const decoded_file_name = decodeURIComponent(fileName);
            const file_type = decoded_file_name.split('.').slice(-1)[0];
            const question_id = decoded_file_name.split('.').slice(0, -1).join('.');


            if (["png", "jpg", "jpeg"].includes(file_type)) {
                const fileUrl = process.env.S3_BUCKET_URL + process.env.S3_QUESTION_IMAGE_DIRECTORY_PATH + "/" + decoded_file_name
                const result = await QuestionService.uploadQuestionImageFile(question_id, fileUrl);

                return {
                    code: 200,
                    message: 'complete',
                    success: result
                }
            }

            else if (["wav", "mp3"].includes(file_type)) {
                const fileUrl = process.env.S3_BUCKET_URL + process.env.S3_QUESTION_SOUND_DIRECTORY_PATH + "/" + decoded_file_name
                const result = await QuestionService.uploadQuestionSoundFile(question_id, fileUrl);
                return {
                    code: 200,
                    message: 'complete',
                    success: result
                }
            }

            return {
                code: 200,
                message: 'unsupported file extension',
                success: false
            }
            
        },

        async createCodingTestQuestion(parent, {input}, context, info) {
            const question_id = await QuestionService.createCodingTestQuestion(input.name, input.paragraph, input.explanation, input.questionCategory, input.questionDifficulty, input.testCases, context.user.id);
            return {
                code: 200,
                message: 'complete',
                success: question_id > 0,
                questionId: question_id
            }
        },

        async updateQuestion(parent, {input}, context, info) {
            const question_id = await QuestionService.updateQuestion(input.id, input.name, input.paragraph, input.answers, input.explanation, input.candidates);
            return {
                code: 200,
                message: 'complete',
                success: question_id > 0,
                questionId: question_id
            }
        },

        async deleteQuestion(parent, {id}, context, info) {
            if (!await QuestionService.isQuestionCreator(id, context.user.id))
                return {
                    code: 200,
                    message: 'not creator',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: await QuestionService.deleteQuestion(id)
            }
        },

        async createTest(parent, {input}, context, info) {
            return {
                code: 200,
                message: 'complete',
                success: await QuestionService.createTest(input.name, input.content, input.questionIds, input.categoryId, input.isPrivate, context.user.id)
            }
        },

        async updateTest(parent, {input}, context, info) {
            if (!await QuestionService.isTestCreator(input.id, context.user.id))
                return {
                    code: 200,
                    message: 'not creator',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: await QuestionService.updateTest(input.id, input.name, input.content, input.questionIds, input.categoryId, input.isPrivate)
            }
        },

        async deleteTest(parent, {id}, context, info) {
            if (!await QuestionService.isTestCreator(id, context.user.id))
                return {
                    code: 200,
                    message: 'not creator',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: await QuestionService.deleteTest(id)
            }
        }
    }
};

module.exports = QuestionResolver;