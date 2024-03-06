const mongoose = require("mongoose");

// Mongoose User model
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true, // Ensure emails are unique
    trim: true, // Trim whitespace from the email
    lowercase: true, // Convert email to lowercase to avoid case-sensitivity issues
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  }
}, { timestamps: true }); // Add createdAt and updatedAt fields automatically

const User = mongoose.model('User', UserSchema);

module.exports = User;