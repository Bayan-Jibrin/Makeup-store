const mongoose = require("mongoose");
const Product = require("../models/ProductModel");


// GET Cart
const getCart = async (req, res) => {
  try {
    if (req.session.cart) res.status(200).json(req.session.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add Product To Cart

const addProduct = async (req, res) => {
  const { product } = req.params;
  const item = await Product.findOne({ name: product });
  try {
    if (item) {
      if (!req.session.cart) {
        req.session.cart = [];
        req.session.cart.push({
          name: item.name,
          qty: 1,
          price: parseFloat(item.price).toFixed(2),
          image: item.image_link,
        });
        res.status(200).json(req.session.cart);
      } else {
        let found;
        req.session.cart.forEach((element) => {
          if (element.name === item.name) {
            found = true;
            element.qty++;
          }
        });
        if (!found) {
          req.session.cart.push({
            name: item.name,
            qty: 1,
            price: parseFloat(item.price).toFixed(2),
            image: item.image_link,
          });
        }
        res.status(200).json(req.session.cart);
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove Item from Cart

const removeItem = async (req, res) => {
  const { product } = req.params;

  try {
    req.session.cart = req.session.cart.filter(
      (element) => element.name !== product
    );

    res.status(200).json(req.session.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Decrease qty
const decreaseQty = async (req, res) => {
  const { product } = req.params;

  try {
    req.session.cart.forEach((element) => {
      if (element.name === product) {
        element.qty--;
      }
    });
    res.status(200).json(req.session.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete cart
const deleteCart = async (req, res) => {
  try {
    if (req.session.cart) {
      delete req.session.cart;
    }
    res.status(200).json('Done');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { getCart, addProduct, removeItem, decreaseQty,deleteCart };
