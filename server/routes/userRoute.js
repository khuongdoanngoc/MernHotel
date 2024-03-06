const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const { getAllUsers, getUserById } = require("../controllers/userController");

router.get("/get-all-users", requireLogin, isAdmin, getAllUsers);
router.post("/get-user-by-id", requireLogin, getUserById);

module.exports = router;
