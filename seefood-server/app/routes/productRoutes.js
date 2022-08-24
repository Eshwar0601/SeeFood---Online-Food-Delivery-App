const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 7,
  },
});

router.get("/", verify, async (req, res) => {
  const userProducts = await Product.find({ user: req.user })
    .then((data) => res.send({ products: data }))
    .catch((err) => res.send(err));
});

router.get("/:id", async (req, res) => {
  const userProducts = await Product.find({ _id: req.params.id })
    .then((data) => res.send({ products: data }))
    .catch((err) => res.send(err));
});

router.get("/restaurant/:id", async (req, res) => {
  const userProducts = await Product.find({
    restaurant: req.params.id,
  })
    .then((data) => res.send({ products: data }))
    .catch((err) => res.send(err));
});

router.post("/", verify, upload.single("productImage"), async (req, res) => {
  const productData = new Product({
    user: req.user,
    restaurant: req.body.restaurant,
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
    description: req.body.description,
  });
  try {
    const savedData = await productData.save();
    res.status(201).send(savedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
