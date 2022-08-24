// const mongoose = require("mongoose");
// const User = require("./User");
// const Product = require("./Product");
// const CartItem = require("./CartItem");

// const cartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   cartItems: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "CartItem",
//       required: false,
//     },
//   ],
//   cartTotal: {
//     type: Number,
//     default: 0,
//   },
//   is_active: {
//     type: Boolean,
//     default: true,
//   },
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });
// module.exports = mongoose.model("Cart", cartSchema);
