const orderModel = require("../models/orderModel");

const createOrder = async (req, res) => {
    if (
        !req.body.user ||
        !req.body.product ||
        !req.body.checkin ||
        !req.body.checkout ||
        !req.body.total
    ) {
        return res.status(403).send({
            success: false,
            message: "bad data",
        });
    }
    const newOrder = await new orderModel(req.body).save();
    res.status(201).send({
        success: true,
        message: "order successfully!",
        newOrder,
    });
};

const getOrder = async (req, res) => {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
        return res.status(403).send({
            success: false,
            message: "order not found!",
        });
    }
    res.status(200).send({
        success: true,
        message: "get order success",
        order,
    });
};

module.exports = {
    createOrder,
    getOrder,
};
