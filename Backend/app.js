const express = require("express");

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");

const session = require("express-session");
const app = express();

// middleware
app.use(
  session({
    secret: "secret-Key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

//routes
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);


module.exports = app;