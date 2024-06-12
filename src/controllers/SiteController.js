const Product = require("../models/Product");
const ComboProducts = require("../models/ComboProducts");
const { multipleMongooseToObject } = require("../util/mongoose");
const { mongooseToObject } = require("../util/mongoose");
class SiteController {
  //[GET] / News
  index(req, res, next) {
    Product.find({})
      .then((products) => {
        res.render("home", {
          products: multipleMongooseToObject(products),
        });
      })
      .catch(next);
  }

  comboProduct(req, res, next){
    ComboProducts.find({})
    .then((cproducts) => {
      res.render("partials/home", {
        cproducts: multipleMongooseToObject(cproducts),
      });
    })
    .catch(next);
  }

  show(req, res, next) {
    ComboProducts.findOne({ slug: req.params.slug })
      .then((cproduct) => {
        res.render("partials/show", {
          cproduct: mongooseToObject(cproduct),
        });
      })
      .catch(next);
  }

}

module.exports = new SiteController();
