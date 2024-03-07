const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Post ID is required'],
    ref: 'Blog'
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  }
}, { timestamps: true });

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
