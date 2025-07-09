const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }, 
  refreshToken: {
    type: String,
    default: null,
  },   
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;