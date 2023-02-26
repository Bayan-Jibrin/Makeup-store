const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  specificType,
  productsTypes,
  searchProducts,
} = require("../controllers/productController");
const isAdmin = require("../middleware/isAdmin");
const prodValidator =require('../middleware/prodValidator')
const requireAuth = require('../middleware/requireAuth')

// GET all products
router.get("/", getProducts);

// GET a single product
router.get("/:id", getProduct);

// POST a new product   
router.post("/",requireAuth,isAdmin,prodValidator,createProduct);

// DELETE a product
router.delete("/:id", requireAuth,isAdmin, deleteProduct);

// UPDATE a product 
router.patch("/:id",requireAuth,isAdmin,prodValidator, updateProduct);


// GET products of same type
router.get('/P/type',specificType);

// GET products types
router.get('/Ps/types',productsTypes);

// Search Products 
router.get('/search/prods',searchProducts);


module.exports = router;
