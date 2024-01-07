const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            // ref: 'product'
        },
    ],
    updated: Date,
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = new mongoose.model("category", categoriesSchema);
