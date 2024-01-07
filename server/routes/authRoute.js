const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../configs/passport");

// controllers import
const {
    register,
    login,
    authGoogle,
    authFacebook,
    getUser,
    resetPassword,
    secret,
    verifyCode,
    updateAuth,
    changePassword,
} = require("../controllers/authController");

// middlewares import
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

// authentication
router.post("/register", register);
router.post("/login", login);

// google authentication
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

// facebook authentication
router.get(
    "/facebook",
    passport.authenticate("facebook", {
        session: false,
    })
);

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        failureRedirect: "login",
        session: false,
    }),
    authFacebook
);

// reset password
router.post("/reset-password", resetPassword);
router.post("/verify-code", verifyCode);

// update info auth
router.patch('/update', requireLogin, updateAuth);

// change password
router.post('/change-password', requireLogin, changePassword)

// authorization
router.get("/user-auth", requireLogin, (req, res) => {
    res.status(200).send({ success: true });
});
router.get("/admin-auth", requireLogin, isAdmin, (req, res) => {
    res.status(200).send({ success: true });
});

router.get("/secret/get-user", requireLogin, getUser);

router.post("/secret", secret);

module.exports = router;
