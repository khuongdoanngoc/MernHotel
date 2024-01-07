const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const { createCategory, getCategories, descriptionCategory } = require("../controllers/categoryController");

router.post("/create", requireLogin, isAdmin, createCategory);
router.get('/', requireLogin, isAdmin, getCategories)
router.get('/:slug', requireLogin, isAdmin, descriptionCategory);

module.exports = router;
