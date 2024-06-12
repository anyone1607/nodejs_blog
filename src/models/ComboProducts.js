const mongoose = require("mongoose");

const slug = require("mongoose-slug-updater");

const Schema = mongoose.Schema;

const ComboProducts = new Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    image: {type: String, require: true},
    price: {type: String, require: true},
    slug: { type: String, slug: "name", unique: true }, 
}, {
    timestamps: true
})

mongoose.plugin(slug);

module.exports = mongoose.model("ComboProducts", ComboProducts);