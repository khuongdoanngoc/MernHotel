const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const { getAllUsers, getWishListByUserId } = require("../controllers/userController");

router.get("/get-all-users", requireLogin, isAdmin, getAllUsers);
router.post("/get-wishlist-by-userid", requireLogin, getWishListByUserId);

module.exports = router;
