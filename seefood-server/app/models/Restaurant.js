const mongoose = require("mongoose");
const User = require("./User");
// var fs = require("fs");
// var path = require("path");

const restaurantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  revenue: {
    type: Number,
    default: 0,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  restaurantImage: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
