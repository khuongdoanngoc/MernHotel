const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const userModel = require("../models/usersModel");

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
                const isExist = await userModel.findOne({
                    email: profileEmail,
                });
                if (isExist) {
                    return cb(null, isExist);
                }
                const newUser = userModel({
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

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: `${process.env.HOSTNAME}/api/v1/auth/facebook/callback`,
            profileFields: ["id", "displayName", "email"],
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                const isExist = await userModel.findOne({
                    email: `${profile.id}@gmail.com`,
                });
                if (isExist) {
                    return cb(null, isExist);
                }
                const newUser = new userModel({
                    authType: "facebook",
                    authFacebookId: profile.id,
                    role: 0,
                    name: profile.displayName,
                    email: `${profile.id}@gmail.com`,
                });
                await newUser.save();
                return cb(null, newUser);
            } catch (error) {
                return cb(error, null);
            }
        }
    )
);
