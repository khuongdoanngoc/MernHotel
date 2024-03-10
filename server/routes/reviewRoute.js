const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const { createReview } = require('../controllers/reviewController')

router.post("/create", requireLogin, createReview);

module.exports = router;
