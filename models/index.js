const Sequelize = require('sequelize');
const AnswerRecord = require('answer_record');
const AnswerSheet = require('answer_sheet');
const Category = require('category');
const CodingQuestionTestCase = require('coding_question_test_case');
const Difficulty = require('difficulty');
const Question = require('question');
const ReviewNote = require('review_note');
const TestQuestion = require('test_question');
const Tier = require('tier');
const User = require('./user')
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.AnswerRecord = AnswerRecord;
db.AnswerSheet = AnswerSheet;
db.Category = Category;
db.CodingQuestionTestCase = CodingQuestionTestCase;
db.Difficulty = Difficulty;
db.Question = Question;
db.ReviewNote = ReviewNote;
db.TestQuestion = TestQuestion;
db.Tier = Tier;
db.User = User;

AnswerRecord.init(sequelize);
AnswerSheet.init(sequelize);
CodingQuestionTestCase.init(sequelize);
Category.init(sequelize);
Difficulty.init(sequelize);
Question.init(sequelize);
ReviewNote.init(sequelize);
TestQuestion.init(sequelize);
Tier.init(sequelize);
User.init(sequelize);

AnswerRecord.associate(db);
AnswerSheet.associate(db);
Category.associate(db);
CodingQuestionTestCase.associate(db);
Difficulty.associate(db);
Question.associate(db);
ReviewNote.associate(db);
TestQuestion.associate(db);
Tier.associate(db);
User.associate(db);

module.exports = db;