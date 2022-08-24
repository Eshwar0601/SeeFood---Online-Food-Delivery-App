const router = require("express").Router();
const { request } = require("express");
const User = require("../models/User");
const Cart = require("../models/Cart");
const verify = require("./verifyToken");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res
      .status(400)
      .send({ error: "User with this Email already exists." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", verify, async (req, res) => {
  const userData = User.findOne({ _id: req.user._id })
    .then((data) =>
      res.status(200).json({
        _id: data._id,
        username: data.username,
        email: data.email,
        is_owner: data.is_owner,
        created: data.created,
      })
    )
    .catch((err) => res.status(400).send(err));
  // return res.status(200).send({
  //   message:
  //     "Dont worry Your code works for now, but your not allowed to see existing users.",
  // });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ error: "Incorrect Email Address." });
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send({ error: "Invalid credentials." });
  }

  const token = jwt.sign({ _id: user._id }, "ILoveCats");
  res.status(200).json({ token: token });
});

module.exports = router;
