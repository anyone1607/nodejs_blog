const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true, unique: true },
    email: {type: String, require: true, unique: true, unique: true},
    password: {type: String, require: true},
    role: {type: String, require: true},
    avatar: {type: String, require: true}
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", User);