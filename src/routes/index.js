// Constains all file Routes
const meRouter = require("./me");
const siteRouter = require("./site");
const productRouter = require("./products");
const authRouter = require("./auth");
const adminRouter = require("./admin");
function route(app) {
  app.use("/me", meRouter);
  app.use("/admin", adminRouter);
  app.use("/auth", authRouter);
  app.use("/products", productRouter);
  app.use("/", siteRouter);
}

module.exports = route;
