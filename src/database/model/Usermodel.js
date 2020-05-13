const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid or not available");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
});


const User = mongoose.model("user", userSchema);

module.exports = User;
