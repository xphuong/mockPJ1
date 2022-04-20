const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');



const createQuestion = catchAsync(async (req, res) => {
    const question = await questionService.createQuestion(req.body);
    res.status(httpStatus.CREATED).send(question);
});

const getAllQuestion = catchAsync(async (req, res) => {
    const options = pick(req.query, ['order', 'size', 'page']);
    const question = await questionService.getAllQuestions(options);
    res.status(httpStatus.OK).send(question);
});

const getQuestionById = catchAsync(async (req, res) => {
    const question = await questionService.getQuestionByID(req.params.questionID);
    res.status(httpStatus.OK).send(question);
});
const updateQuestion = catchAsync(async (req, res) => {
    const question = await questionService.updateQuestionsById(req.params.questionID, req.body);
    res.status(httpStatus.OK).send(question);
});

const deleteQuestion = catchAsync(async (req, res) => {
    await questionService.deleteQuestionsById(req.params.questionID);
    res.status(httpStatus.OK).send();
});

module.exports = {
    createQuestion,
    getAllQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};
