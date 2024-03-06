const mongoose = require("mongoose");

// Mongoose Blog model
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  text: {
    type: String,
    required: [true, 'Text content is required'],
  },
  image: {
    type: String,
    trim: true,
    required: [false, 'Image URL is not required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  }
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
