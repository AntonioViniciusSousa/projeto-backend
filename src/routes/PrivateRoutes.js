const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const UserRoutes = require("./UserRoutes");
const ProductsRoutes = require("./ProductsRoutes");
const CategoriesRoutes = require("./CategoriesRoutes");
const ProductImagesRoutes = require("./ProductImagesRoutes");
const ProductOptionsRoutes = require("./ProductOptionsRoutes");
const ProductsCategoryRoutes = require("./ProductsCategoryRoutes");


const PrivateRoutes = express.Router();

// PrivateRoutes.use((request, response, next) => {
//   return next();
//   let auth = true;

//   if (request.headers.token) {
//     const { token } = request.headers;

//     try {
//       jwt.verify(token, process.env.APP_KEY_TOKEN);
//       auth = true;
//     } catch (e) {
//       return response.status(403).send(e);
//     }
//   }

//   if (auth === false) {
//     return response.status(403).send("Não Autorizado");
//   }
//   next();
// });

PrivateRoutes.use(UserRoutes);
PrivateRoutes.use(ProductsRoutes);
PrivateRoutes.use(CategoriesRoutes);
PrivateRoutes.use(ProductImagesRoutes);
PrivateRoutes.use(ProductOptionsRoutes);
PrivateRoutes.use(ProductsCategoryRoutes);

module.exports = PrivateRoutes;