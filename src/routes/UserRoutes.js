const express = require("express");
const UserController = require("../controllers/UserController");
const UserRoutes = express.Router();

const userController = new UserController();

UserRoutes.get("/users", userController.list);
UserRoutes.get("/users/:id", userController.queryById);
UserRoutes.post("/users", userController.create);
UserRoutes.put("/users/:id", userController.update);
UserRoutes.delete("/users/:id", userController.delete);

module.exports = UserRoutes;