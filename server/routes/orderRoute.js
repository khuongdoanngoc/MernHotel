const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

const { createOrder, getOrder } = require('../controllers/orderController')

router.post("/create", requireLogin, createOrder);
router.get('/:id', requireLogin, getOrder)

module.exports = router;
