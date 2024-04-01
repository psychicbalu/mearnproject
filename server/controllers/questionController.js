const Question = require('../models/questionModel');

const createQuestion = async (req, res) => {
  try {
    // Assuming req.body contains a JSON array of questions
    const questionsData = req.body;

    // Save all questions at once
    const savedQuestions = await Question.insertMany(questionsData);

    // Send the saved questions as a response
    res.status(201).json(savedQuestions);
  } catch (error) {
    // Handle any errors that occur during the save operation
    console.error('Error saving questions:', error);
    res.status(500).json({ error: 'Error saving questions' });
  }
};



const getAllQuestions = async (req, res) => {
  try {
    // Retrieve all questions from the database
    const allQuestions = await Question.find();
    res.status(200).json(allQuestions);
  } catch (error) {
    // Handle any errors that occur during retrieval
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    res.status(200).json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Error fetching question' });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answerType, answerOptions, answer } = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(id, { question, answerType, answerOptions, answer }, { new: true });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Error updating question' });
  }
};


module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
};
