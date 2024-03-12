const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    checkin: {
        type: Date
    },
    checkout: {
        type: Date
    },
    total: {
        type: Number
    },
    note: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = new mongoose.model("order", orderSchema);
