const mongoose = require("mongoose");
const Product = require("../models/ProductModel");

// GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single product

const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Product" });
  }
  const product = await Product.findById({ _id: id });
  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

// POST a new product

const createProduct = async (req, res) => {
  const { name, brand, price, description, productType, image_link } = req.body;
  try {
    const product = await Product.create({
      name,
      brand,
      price,
      description,
      productType,
      image_link,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Product" });
  }

  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

// UPDATE a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Product" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

// GET products of same type
const specificType = async (req, res) => {
  const { productType } = req.query;
  try {
    const products = await Product.find({ productType });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET products types
const productsTypes = async (req, res) => {
  try {
    const products = await Product.distinct("productType");
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Search Products
const searchProducts = async (req, res) => {
  const { name } = req.query;
  try {
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    }).select({ name: 1, image_link: 1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  specificType,
  productsTypes,
  searchProducts,
};
