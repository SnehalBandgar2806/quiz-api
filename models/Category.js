// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String }
}, { collection: 'categories' });

module.exports = mongoose.model('Category', categorySchema);
