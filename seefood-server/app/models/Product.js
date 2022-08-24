const mongoose = require("mongoose");
const Restaurant = require("./Restaurant");
const User = require("./User");

const productSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  restaurant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Your product must be worth atlease 1 Rupee."],
  },
  productImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
