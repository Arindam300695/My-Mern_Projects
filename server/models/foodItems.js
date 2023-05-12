const mongoose = require('mongoose');

const Food = mongoose.Schema({
    categoryName: { type: String, required: true, },
    name: { type: String, required: true },
    description: { type: String, required: "true" },
    variety: { type: Array, required: "true" },
    image: { type: Array, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Food", Food);