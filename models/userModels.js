const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
    trim: true,
    unique: [true, "The provided email address is already in use."],
    minLength: [6, "Please enter an email address with a minimum of 6 characters."],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "You must provide the password."],
    trim: true,
    select: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationCodeValidation: {
    type: Number,
    select: false,
  },
  forgotPasswordCode: {
    type: String,
    select: false,
  },
  forgotPasswordCodeValidation: {
    type: Number,
    select: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
