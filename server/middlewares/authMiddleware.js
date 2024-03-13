const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireLogin = async (req, res, next) => {
    try {
        // verify token from header authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Please login to use this function",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.user.token = token;
        next();
    } catch (error) {}
};

const isAdmin = async (req, res, next) => {
    const userDb = await userModel.findOne({ _id: req.user._id });
    if (userDb.role !== 1) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized!",
        });
    }
    next();
};

const authenticate = async (token, _id) => {
    const decoded = await JWT.verify(token, process.env.JWT_SECRET);
    const isMatched = decoded._id === _id.toString();
    return isMatched;
};

module.exports = {
    requireLogin,
    isAdmin,
    authenticate,
};
