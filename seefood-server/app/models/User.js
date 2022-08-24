const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  is_owner: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
