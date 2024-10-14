const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date, // Changed from String to Date
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String, // Fixed typo
    resetPasswordExpireAt: Date, // Fixed typo
    verificationToken: String,
    verificationTokenExpiresAt: Date, // Fixed typo
  },
  { timestamps: true }
);

// Ensure not to redefine model if it already exists
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
