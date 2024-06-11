const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
    orderDate: {type: Date, require: true},
    shippingAddress: {type: String, require: true},
    billingAddress: {type: String, require: true},
    paymentMethod: {type: String, require: true},
    totalPrice: {type: Number, require: true, min:0},
    shippingMethod: {type: String, require: true},
    orderStatus: {type: Boolean},
    notes: {type: String},
}, {
    timestamps: true,
});

module.exports = Order.model("Order", Order);

