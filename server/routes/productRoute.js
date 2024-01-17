const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const { createProduct, getProducts, descriptionProduct, updateProduct } = require("../controllers/productController");

router.post("/create", requireLogin, isAdmin, createProduct);
router.get('/', requireLogin, isAdmin, getProducts)
router.get('/:slug', requireLogin, isAdmin, descriptionProduct);
router.patch('/update', requireLogin, isAdmin, updateProduct)

module.exports = router;
