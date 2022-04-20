const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const questionValidation = require('../validations/question.validation');
const questionController = require('../controllers/question.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('manageQuestions'), validate(questionValidation.createQuestion), questionController.createQuestion)
    .get(auth('getQuestions'), questionController.getAllQuestion);
router
    .route('/:questionID')
    .get(auth('getQuestions'), validate(questionValidation.getQuestion), questionController.getQuestionById)
    .patch(auth('manageQuestions'), validate(questionValidation.updateQuestion), questionController.updateQuestion)
    .delete(auth('manageQuestions'), validate(questionValidation.deleteQuestion), questionController.deleteQuestion);

module.exports = router;
