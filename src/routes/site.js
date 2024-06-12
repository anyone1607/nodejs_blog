const express = require("express");
const router = express.Router();

const siteController = require("../controllers/SiteController");

// newsController.index
router.get("/combo", siteController.comboProduct);
router.get("/:slug", siteController.show);
router.get("/", siteController.index);
module.exports = router;
