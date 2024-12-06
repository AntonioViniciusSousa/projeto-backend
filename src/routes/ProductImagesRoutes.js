const express = require("express");
const ProductImagesController = require("../controllers/ProductImagesController");
const ProductImagesRoutes = express.Router();

const productImagesController = new ProductImagesController();

ProductImagesRoutes.get("/product", productImagesController.list);
ProductImagesRoutes.get("/product/:id", productImagesController.queryById);
ProductImagesRoutes.post("/product", productImagesController.create);
ProductImagesRoutes.put("/product/:id", productImagesController.update);
ProductImagesRoutes.delete("/product/:id", productImagesController.delete);

module.exports = ProductImagesRoutes;