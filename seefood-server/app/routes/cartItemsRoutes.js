const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Product = require("../models/Product");
const CartItem = require("../models/CartItem");
const Cart = require("../models/Cart");

router.get("/", verify, async (req, res) => {
  const userCartItems = await CartItem.find({ user: req.user, is_active: true })
    .then((data) => res.send({ cart_items: data }))
    .catch((err) => res.send(err));
});
router.put("/:id", async (req, res) => {
  const userCartItems = await CartItem.findOne({ _id: req.params.id });
  try {
    userCartItems.is_active = req.body.is_active;
    const savedData = await userCartItems.save();
    res.status(201).send(savedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", verify, async (req, res) => {
  const product = await Product.findOne({ _id: req.body.product });

  const cartItemData = new CartItem({
    user: req.user,
    quantity: req.body.quantity,
    product: req.body.product,
    productName: product.name,
    productDescription: product.description,
    productImage: product.productImage,
    productRating: product.rating,
    productPrice: product.price,
    cartItemsTotal: product.price * req.body.quantity,
  });
  try {
    const savedData = await cartItemData.save();
    res.status(201).send(savedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
