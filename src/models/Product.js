const mongoose = require("mongoose");

const slug = require("mongoose-slug-updater");

const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: String, required: true },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

Product.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
mongoose.plugin(slug);

module.exports = mongoose.model("Product", Product);
