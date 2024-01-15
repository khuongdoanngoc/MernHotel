const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const { createCategory, getCategories, descriptionCategory, updateCategory } = require("../controllers/categoryController");

router.post("/create", requireLogin, isAdmin, createCategory);
router.get('/', requireLogin, isAdmin, getCategories)
router.get('/:slug', requireLogin, isAdmin, descriptionCategory);
router.patch('/update', requireLogin, isAdmin, updateCategory)

module.exports = router;
