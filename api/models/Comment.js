const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Post ID is required'],
    ref: 'Blog'
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  text: {
    type: String,
    required: [true, 'Text content is required'],
    trim: true,
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
