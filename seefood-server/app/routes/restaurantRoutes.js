const router = require("express").Router();
const Restaurant = require("../models/Restaurant");
const verify = require("./verifyToken");
const User = require("../models/User");
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

// const multer = require('multer');

router.get("/all", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  const userRestaurants = await Restaurant.find({})
    .then((data) => res.send({ restaurants: data }))
    .catch((err) => res.send(err));
});

router.get("/", verify, async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  const userRestaurants = await Restaurant.find({ user: req.user })
    .then((data) => res.send({ restaurants: data }))
    .catch((err) => res.send(err));
});

router.get("/:id", verify, async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  const userRestaurants = await Restaurant.find({
    user: req.user,
    _id: req.params.id,
  })
    .then((data) => res.send({ restaurants: data }))
    .catch((err) => res.send(err));
});

router.post("/", verify, upload.single("restaurantImage"), async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  const restaurantData = new Restaurant({
    user: req.user,
    name: req.body.name,
    address: req.body.address,
    restaurantImage: req.file.path,
    description: req.body.description,
  });
  const user = await User.findOne({ _id: req.user._id });
  user.is_owner = true;
  try {
    const savedData = await restaurantData.save();
    await user.save();
    res.status(201).send(savedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
