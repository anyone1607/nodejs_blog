const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Store = new Schema({
    sku: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
}, {
    timestamps: true
});

module.exports = Store.model("Store", Store);