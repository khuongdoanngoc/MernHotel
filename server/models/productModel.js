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
    quantity: {
        type: Number,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        default: null,
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = new mongoose.model("product", productSchema);
