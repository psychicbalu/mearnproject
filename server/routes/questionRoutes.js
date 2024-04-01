// server/routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/questions', questionController.createQuestion);
router.get('/questions', questionController.getAllQuestions);

router.post('/questionsid', questionController.getQuestionById);
router.get('/questionsid', questionController.updateQuestion);

module.exports = router;
