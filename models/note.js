const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, },
  content: { type: String },
  createAt: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: false}
});

module.exports = mongoose.model('Note', noteSchema);