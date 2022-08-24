const express = require("express");

const authRouter = require("./app/routes/auth");
const restaurantRouter = require("./app/routes/restaurantRoutes");
const productsRoute = require("./app/routes/productRoutes");
const cartItemsRoute = require("./app/routes/cartItemsRoutes");
const orderRoute = require("./app/routes/orderRoute");

const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

DB_URL = "mongodb://localhost:27017/SeeFood";
mongoose.connect(DB_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to DB!");
});

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  );
  next();
});
app.use("/uploads", express.static("uploads"));

// my routes
app.use("/api/user", authRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/product", productsRoute);
app.use("/api/cartitem", cartItemsRoute);
app.use("/api/order", orderRoute);

app.listen(8080, () => {
  console.log("Server Running in http://127.0.0.1:8080");
});
