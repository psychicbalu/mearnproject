const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  number: Number,
  question: String,
  answerType: String,
  answerOptions: [String],
  answer: String,
});

module.exports = mongoose.model('Question', questionSchema);