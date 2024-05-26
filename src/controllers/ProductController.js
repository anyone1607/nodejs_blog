const Product = require("../models/Product");

const { mongooseToObject } = require("../util/mongoose");

class ProductController {
  //[GET] /products/:slug
  show(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then((product) => {
        res.render("products/show", {
          product: mongooseToObject(product),
        });
      })
      .catch(next);
  }

  //[GET] / create
  create(req, res, next) {
    res.render("products/create");
  }
  //[POST] / store
  async store(req, res, next) {
    const product = new Product(req.body);
    await product
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {
        next(error);
      });
  }

  //[GET] /products/:id/edit
  edit(req, res, next) {
    Product.findById(req.params.id)
      .then((product) => {
        res.render("products/edit", {
          product: mongooseToObject(product),
        });
      })
      .catch(next);
  }
  //[PUT]/products/:id
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/products"))
      .catch(next);
  }

  //[DELETE]/products/:id
  delete(req, res, next) {
    Product.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  
  //[DELETE]/products/:id/force
  forceDelete(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH]/products/:id/restore
  restoreProduct(req, res, next) {
    Product.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }  
}

module.exports = new ProductController();
