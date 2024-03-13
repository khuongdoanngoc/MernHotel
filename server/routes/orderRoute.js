const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    getOrders,
    cancelOrder,
} = require("../controllers/orderController");

router.get("/get-orders", requireLogin, isAdmin, getOrders);
router.post("/create", requireLogin, createOrder);
router.get("/:id", requireLogin, getOrderById);
router.get("/get-orders-by-userid/:id", requireLogin, getOrdersByUserId);
router.delete("/cancel/:id", requireLogin, cancelOrder);

module.exports = router;
