const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../configs/passport");
const JWT = require("jsonwebtoken");

// controllers import
const {
    register,
    login,
    authGoogle,
    authFacebook,
    getUser,
    secret,
} = require("../controllers/authController");

// middlewares import
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

// authentication
router.post("/register", register);
router.post("/login", login);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    authGoogle
);

// authorization
router.get("/user-auth", requireLogin, (req, res) => {
    res.status(200).send({ success: true });
});
router.get("/admin-auth", requireLogin, isAdmin, (req, res) => {
    res.status(200).send({ success: true });
});

router.get("/secret/get-user", requireLogin, getUser);

router.get("/secret", requireLogin, isAdmin, secret);

module.exports = router;
