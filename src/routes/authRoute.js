const express = require("express");
const router = express.Router();

// controllers import
const { register, login, secret } = require("../controllers/authController");

// middlewares import
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/secret", requireLogin, isAdmin, secret);

module.exports = router;
