const JWT = require("jsonwebtoken");
const userModel = require('../models/usersModel')

const requireLogin = async (req, res, next) => {
    try {
        // verify token from header authorization
        const authHeader = req.headers.authorization
        if (!authHeader) {
            res.status(404).send({
                success: false,
                message: 'No Auth Token'
            })
        }

        const token = authHeader.split(' ')[1];

        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {}
};

const isAdmin = async (req, res, next) => {
    const userDb = await userModel.findOne({_id: req.user._id})
    if (userDb.role !== 1) {
        return res.status(404).send({
            success: false,
            message: 'No Authorization!'
        })
    }
    next();
}

module.exports = {
    requireLogin,
    isAdmin
};