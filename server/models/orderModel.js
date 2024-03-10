const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = new mongoose.model("order", orderSchema);
