const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const {
    createCategory,
    getCategories,
    descriptionCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

router.post("/create", requireLogin, isAdmin, createCategory);
router.get("/", getCategories);
router.get("/:slug", requireLogin, isAdmin, descriptionCategory);
router.patch("/update", requireLogin, isAdmin, updateCategory);
router.delete("/:slug/delete", requireLogin, isAdmin, deleteCategory);

module.exports = router;
