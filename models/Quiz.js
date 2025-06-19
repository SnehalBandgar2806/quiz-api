const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  category: String,
  questions: Array,
  time: String,
  date: String,
  prizePool: String,
  maxQuestions: Number,
  maxTime: Number,
  spots: Number,
});

module.exports = mongoose.model('Quiz', quizSchema);
