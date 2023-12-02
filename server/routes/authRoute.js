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
    secret,
} = require("../controllers/authController");

// middlewares import
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

// authentication
router.post("/register", register);
router.post("/login", login);

router.get('/login/success', async (req, res) => {
    
})
router.get('/login/failure', (req, res) => {
    
})


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
    res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireLogin, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/secret", requireLogin, isAdmin, secret);

module.exports = router;
