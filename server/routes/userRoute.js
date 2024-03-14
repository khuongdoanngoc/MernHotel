const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const { getAllUsers, getWishListByUserId, addToWishList } = require("../controllers/userController");

router.get("/get-all-users", requireLogin, isAdmin, getAllUsers);
router.post("/get-wishlist-by-userid", requireLogin, getWishListByUserId);
router.post('/add-to-wishlist', requireLogin, addToWishList)

module.exports = router;
