const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const {
    createProduct,
    getProducts,
    descriptionProduct,
    updateProduct,
    deleteProduct,
    getProductById
} = require("../controllers/productController");

router.post("/create", requireLogin, isAdmin, createProduct);
router.get("/", getProducts);
router.post('/get-product-by-id', getProductById);
router.get("/:slug", requireLogin, isAdmin, descriptionProduct);
router.patch("/update", requireLogin, isAdmin, updateProduct);
router.delete("/:slug/delete", requireLogin, isAdmin, deleteProduct);

module.exports = router;
