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
        type: String,
    },
    pricePerDay: {
        type: Number,
    },
    imgUrl: {
        type: String,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }],
    updated: Date,
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = new mongoose.model("product", productSchema);
