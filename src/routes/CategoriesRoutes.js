const express = require("express");
const CategoriesController = require("../controllers/CategoriesController");
const CategoriesRoutes = express.Router();

const categoriesController = new CategoriesController();

CategoriesRoutes.get("/category/search", categoriesController.listCategories);
CategoriesRoutes.get("/category", categoriesController.list);
CategoriesRoutes.get("/category/:id", categoriesController.queryById);
CategoriesRoutes.post("/category", categoriesController.create);
CategoriesRoutes.put("/category/:id", categoriesController.update);
CategoriesRoutes.delete("/category/:id", categoriesController.delete);

module.exports = CategoriesRoutes;