const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Order = require("../models/Order");
const CartItem = require("../models/CartItem");

router.get("/", verify, async (req, res) => {
  const orderObjectOfUser = await Order.find({ user: req.user })
    .then((data) => res.status(200).send({ orders: data }))
    .catch((err) => res.status(400).send(err));
});

router.post("/", verify, async (req, res) => {
  let cartArray = [];
  let orderAmount = 0;
  const cartItemsOfUser = await CartItem.find({
    user: req.user,
    is_active: true,
  });
  if (cartItemsOfUser[0] != undefined) {
    cartItemsOfUser.map((cartItem) => {
      cartItem.is_active = false;
      cartArray.push(cartItem._id);
      orderAmount += cartItem.cartItemsTotal;
      cartItem.save();
    });
  }

  const createOrder = new Order({
    user: req.user,
    cartItems: cartArray,
    orderAmount: orderAmount,
  });

  try {
    const savedData = await createOrder.save();
    res.status(201).send(savedData);
  } catch (err) {
    res.send(400).send(err);
  }
});

module.exports = router;
