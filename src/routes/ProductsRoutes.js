const express = require("express");
const ProductsController = require("../controllers/ProductsController");
const ProductsRoutes = express.Router();

const productsController = new ProductsController();

ProductsRoutes.get("/product/search", productsController.listProducts);
ProductsRoutes.get("/product", productsController.list);
ProductsRoutes.get("/product/:id", productsController.queryById);
ProductsRoutes.post("/product", productsController.create);
ProductsRoutes.put("/product/:id", productsController.update);
ProductsRoutes.delete("/product/:id", productsController.delete);

module.exports = ProductsRoutes;