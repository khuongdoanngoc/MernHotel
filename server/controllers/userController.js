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

module.exports = {
    getAllUsers,
};
