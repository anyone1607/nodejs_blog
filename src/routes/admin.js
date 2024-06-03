const express = require("express");

const router = express.Router();

const adminController = require("../controllers/AdminController");  

router.get("/dashboard", adminController.show);

module.exports = router;