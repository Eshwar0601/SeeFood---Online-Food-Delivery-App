const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productPrice: {
    type: Number,
    default: 0,
  },
  productName: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productImage: {
    type: String,
  },
  productRating: {
    type: Number,
  },
  cartItemsTotal: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("CartItem", cartItemSchema);
