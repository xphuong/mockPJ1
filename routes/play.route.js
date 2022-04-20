const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const playValidation = require('../validations/play.validation');
const playController = require('../controllers/play.controller');

const router = express.Router();

router
    .route('/')
    .get(auth(), playController.getAllQuestions);

router
    .route('/submit')
    .post(auth(), validate(playValidation.submitQuestion), playController.submitQuestions);
module.exports = router;
