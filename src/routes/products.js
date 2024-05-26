const express = require("express");

const router = express.Router();

const productController = require("../controllers/ProductController");

router.get("/create", productController.create);
router.post("/store", productController.store);
router.get("/:id/edit", productController.edit);
router.put("/:id", productController.update);
router.patch("/:id/restore", productController.restoreProduct);
router.delete("/:id", productController.delete);
router.delete("/:id/force", productController.forceDelete);
router.get("/:slug", productController.show);

module.exports = router;
