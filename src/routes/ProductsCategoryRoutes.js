const express = require("express");
const ProductsCategoryController = require("../controllers/ProductsCategoryController");
const ProductsCategoryRoutes = express.Router();

const productsCategoryController = new ProductsCategoryController();

ProductsCategoryRoutes.get("/productCategory", productsCategoryController.list);
ProductsCategoryRoutes.get("/productCategory/:product_id/:category_id", productsCategoryController.queryById);
ProductsCategoryRoutes.post("/productCategory", productsCategoryController.create);
ProductsCategoryRoutes.delete("/productCategory/:product_id/:category_id", productsCategoryController.delete);

module.exports = ProductsCategoryRoutes;