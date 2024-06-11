const mongoose = require("mongoose");

const slug = require("mongoose-slug-updater");

const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const ProductDetail = new Schema({
    origin: {type: String},
    material: {type: String},
    size: {type: String},
    organization: {type: String},
    productDescription: {type: String},
    from: {type: String},
}, { _id: false });

const Thumbnail = new Schema({
    images: [{
      imageUrl: {type: String}
    }]
}, {_id: false});

const Product = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: String, required: true },
    productDetail: ProductDetail,
    thumbnail: Thumbnail,
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
