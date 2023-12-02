const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const user = require("../models/usersModel");

passport.initialize();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.HOSTNAME}/api/v1/auth/google/callback`,
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                // check if exist google account
                const profileEmail = profile.emails[0].value;
                const isExist = await user.findOne({ email: profileEmail });
                if (isExist) {
                    return cb(null, isExist);
                }
                const newUser = user({
                    authType: "google",
                    authGoogleId: profile.id,
                    role: 0,
                    name: profile.name.familyName,
                    email: profile.emails[0].value,
                });
                await newUser.save();
                return cb(null, newUser);
            } catch (error) {
                console.log("passport google error: ", error);
                return cb(error, null);
            }
        }
    )
);
