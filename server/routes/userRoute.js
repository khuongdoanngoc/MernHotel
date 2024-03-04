const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const { getAllUsers } = require("../controllers/userController");

router.get("/get-all-users", requireLogin, isAdmin, getAllUsers);

module.exports = router;
