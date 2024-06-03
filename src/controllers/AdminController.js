const Product = require("../models/Product");

const User = require("../models/User");

class AdminController {
    show(req, res, next) {
        res.render("admin/dashboard");
    }
}

module.exports = new AdminController();