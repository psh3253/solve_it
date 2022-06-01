const QuestionService = require('../services/question');
const QuestionSolvingService = require('../services/question_solving');
const Util = require('../util');

const QuestionResolver = {
    Question: {
        __resolveType: (question) => {
            if (question.type === "MULTIPLE_CHOICE")
                return "MultipleChoice"
            else
                return "Other"
        }
    },
    Query: {
        async question(parent, {id}, context, info) {
            const question = await QuestionService.getQuestion(id);
            const answers = await QuestionService.getAnswer(id);
            const candidates = await QuestionService.getCandidate(id);
            const wrong_count = question.try_count - question.correct_count
            let answer_list = [];
            let candidate_list = [];
            
            for (let i of answers) {
                answer_list.push(i.answer)
            }
            for (let i of candidates) {
                candidate_list.push({
                    number: i.number,
                    content: i.content
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
                candidates: candidate_list
            };
        },

        async test(parent, {id}, context, info) {
            const test = await QuestionService.getTest(id, context.user.id);
            if(test === null)
                return null;
            const test_question_ids = await QuestionService.getTestQuestions(id);
            const test_tags = await QuestionService.getTestTags(id);
            let question_id_list = [];
            let tag_list = [];
            for(let i of test_question_ids) {
                question_id_list.push({
                    questionId: i.question_id,
                    number: i.number
                });
            }
            for(let i of test_tags) {
                tag_list.push(i.tag);
            }
            return {
                id: test.id,
                name: test.title,
                content: test.content,
                ownerId: test.creator_id,
                creationDate: Util.getDateString(test.created_at),
                tryCnt: test.try_count,
                private: test.private,
                testCategory: {
                    id: test.Category.id,
                    name: test.Category.name
                },
                questionIds: question_id_list,
                tag: tag_list
            }
        },

        async allTests(parent, {page, order}, context, info) {
            const tests = await QuestionService.getAllTests(page, order);
            let test_list = [];
            for(let i of tests)
            {
                test_list.push({
                    id: i.id,
                    name: i.title,
                    ownerId: i.creator_id,
                    creationDate: Util.getDateString(i.created_at),
                    private: i.private,
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
            for(let i of tests)
            {
                test_list.push({
                    id: i.id,
                    name: i.title,
                    ownerId: i.creator_id,
                    creationDate: Util.getDateString(i.created_at),
                    private: i.private,
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
            for(let i of tests)
            {
                test_list.push({
                    id: i.id,
                    name: i.title,
                    ownerId: i.creator_id,
                    creationDate: Util.getDateString(i.created_at),
                    private: i.private,
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

        async updateQuestion(parent, {input}, context, info) {
            const question_id = await QuestionService.updateQuestion(input, question_id, input.name, input.paragraph, input.answers, input.explanation, input.candidates);
            return {
                code: 200,
                message: 'complete',
                success: question_id > 0,
                questionId: question_id
            }
        },

        async deleteQuestion(parent, {id}, context, info) {
            if(!await QuestionService.isQuestionCreator(id, context.user.id))
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
        },

        async createTest(parent, {input}, context, info) {
            return {
                code: 200,
                message: 'complete',
                success: await QuestionService.createTest(input.name, input.content, input.questionIds, input.categoryId, input.private, context.user.id)
            }
        },

        async updateTest(parent, {input}, context, info) {
            if(!await QuestionService.isTestCreator(input.id, context.user.id))
                return {
                    code: 200,
                    message: 'not creator',
                    success: false
                }
            return {
                code: 200,
                message: 'complete',
                success: await QuestionService.updateTest(input.id, input.name, input.content, input.questionIds, input.categoryId, input.private)
            }
        },

        async deleteTest(parent, {id}, context, info) {
            if(!await QuestionService.isTestCreator(id, context.user.id))
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