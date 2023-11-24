const express = require("express");
const router = express.Router();

// controllers import
const { register, login, secret } = require("../controllers/authController");

// middlewares import
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/user-auth", requireLogin, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireLogin, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/secret", requireLogin, isAdmin, secret);

module.exports = router;
