const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    unique:false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    unique:false
  },
  tag: {
    type: String,
    default: "general"
  },
  date: {
    type: Date,
    default: Date.now
  },
});
const Notes= mongoose.model('notes', NotesSchema);
module.exports = Notes;