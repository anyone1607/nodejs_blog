// Constains all file Routes
const meRouter = require("./me");
const siteRouter = require("./site");
const productRouter = require("./products");

function route(app) {
  app.use("/me", meRouter);
  app.use("/products", productRouter);
  app.use("/", siteRouter);
}

module.exports = route;
