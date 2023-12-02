const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    phone: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        // required: true,
    },
    role: {
        type: Number,
        enum: [1, 0],
        required: true,
    },
    authType: {
        type: String,
        enum: ["local", "google", "facebook"],
        required: true
    },
    authGoogleId: {
        type: String,
        default: null,
    },
    authFacebookId: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model("user", userSchema);
