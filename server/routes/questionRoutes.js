// server/routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/questions', questionController.createQuestion);
router.get('/questions', questionController.getAllQuestions);

router.get('/questionsid/:id', questionController.getQuestionById);
router.put('/questionsid/:id', questionController.updateQuestion);

module.exports = router;
