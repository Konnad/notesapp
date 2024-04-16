const mongoose = require('mongoose');
const NoteSchema = require('./Note');

// User Scheema.
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, },
  password: { type: String },
  isAdmin: { type: Boolean, default: false},
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;