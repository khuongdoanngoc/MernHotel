const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = new mongoose.model("product", productSchema);
