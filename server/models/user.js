const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: "true" },
    confirmPassword: { type: String },
    address: { type: String, required: true },
    avatar: { type: String, default: "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg" },
}, { timestamps: true });

module.exports = mongoose.model("User", User);