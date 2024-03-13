const { sendConfirmOrder } = require("../configs/nodemailer");
const { decodeToken } = require("../helpers/authHelper");
const { authenticate } = require("../middlewares/authMiddleware");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

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
    const product = await productModel.findById(newOrder.product);
    const user = await userModel.findById(newOrder.user);
    productName = product.name;
    userName = user.name;
    const payload = {
        order: newOrder,
        productName,
        userName,
    };
    sendConfirmOrder("khuongdoanngoc.dev@gmail.com", payload);
    res.status(201).send({
        success: true,
        message: "order successfully!",
        newOrder,
    });
};

const getOrderById = async (req, res) => {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
        return res.status(403).send({
            success: false,
            message: "order not found!",
        });
    }
    const product = await productModel.findById(order.product, "name");
    const user = await userModel.findById(order.user, "name");
    res.status(200).send({
        success: true,
        message: "get order success",
        order,
        product,
        user,
    });
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        if (!orders) {
            return res.status(200).send({
                success: true,
                message: "not found!",
            });
        }
        res.status(200).send({
            success: true,
            message: "get orders success",
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            error,
        });
    }
};

const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.params.id });
        res.status(200).send({
            success: true,
            message: "get orders success",
            orders,
        });
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error,
        });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        const token = req.headers["authorization"].split(" ")[1];
        const isAuthMatched = await authenticate(token, order.user);
        if (!isAuthMatched) {
            const userId = await decodeToken(token);
            const user = await userModel.findById(userId);
            if (user.role === 1) {
                await orderModel.findOneAndDelete({ _id: req.params.id });
                return res.status(200).send({
                    success: true,
                    message: "the order canceled",
                });
            }
            return res.status(403).send({
                success: false,
                message: "not have access",
            });
        }
        await orderModel.findOneAndDelete({ _id: req.params.id });
        return res.status(200).send({
            success: true,
            message: "the order canceled",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "bad request",
        });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    getOrders,
    cancelOrder,
};
