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
    .get( validate(questionValidation.getQuestion), questionController.getQuestionById)
    .patch( validate(questionValidation.updateQuestion), questionController.updateQuestion)
    .delete( validate(questionValidation.deleteQuestion), questionController.deleteQuestion);

module.exports = router;
