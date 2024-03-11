const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    author: {
        type: String,
    },
    comment: {
        type: String,
    },
    rate: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = new mongoose.model("review", reviewSchema);
