const express = require("express");
const ProductOptionsController = require("../controllers/ProductOptionsController");
const ProductOptionsRoutes = express.Router();

const productOptionsController = new ProductOptionsController();

ProductOptionsRoutes.get("/product", productOptionsController.list);
ProductOptionsRoutes.get("/product/:id", productOptionsController.queryById);
ProductOptionsRoutes.post("/product", productOptionsController.create);
ProductOptionsRoutes.put("/product/:id", productOptionsController.update);
ProductOptionsRoutes.delete("/product/:id", productOptionsController.delete);

module.exports = ProductOptionsRoutes;