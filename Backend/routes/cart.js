const express = require("express");
const router = express.Router();
const { getCart,addProduct , removeItem ,decreaseQty,deleteCart } = require('../controllers/cartController')
const requireAuth = require('../middleware/requireAuth')

// Delete cart 
router.get("/deleteCart",deleteCart);

// require auth for all cart routes
router.use(requireAuth)

// GET Cart
router.get("/", getCart);

// Add Product To Cart
router.get("/add/:product", addProduct);

// Remove Item from Cart
router.get("/remove/:product", removeItem);

// Decrease qty
router.get("/dec/:product", decreaseQty);



module.exports = router;
