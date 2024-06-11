const Product = require("../models/Product");
const { multipleMongooseToObject } = require("../util/mongoose");
const User = require("../models/User");

class AdminController {
    show(req, res, next) {
        User.find({})
        .then((users) =>{
            res.render("admin/dashboard", {
                users: multipleMongooseToObject(users),
            })
        })
        .catch(next);
    }
}

module.exports = new AdminController();