const userModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
    try {
        // 
        const users = await userModel.find().select("_id name username").exec();
        res.status(200).send({
            success: true,
            message: 'Get all users successfully!',
            users
        });
    } catch (error) {
        res.status(403).send({
            success: false,
            message: "Error get users",
        });
    }
};

const getWishListByUserId = async (req, res) => {
    try {
        const user = await userModel.findById(req.body._id);
        if (!user) {
            return res.status(403).send({
                success: false,
                message: 'user not found!'
            })
        }
        res.status(200).send({
            success: true,
            message: 'get user successfully',
            user
        })
    } catch (error) {
        res.status(403).send({
            success: false,
            message: "Error get user",
        });
    }
}


module.exports = {
    getAllUsers,
    getWishListByUserId
};
