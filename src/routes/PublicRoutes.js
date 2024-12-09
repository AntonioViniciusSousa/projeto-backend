const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AuthController = require("../controllers/AuthController");

const PublicRoutes = express.Router();

PublicRoutes.post("/login", async (request, response) => {
  const body = request.body;
  const auth = new AuthController();
  const data = await auth.login(body.firstname, body.password);

  if (data) {
    const dataToken = {
      id: data.id,
      email: data.email,
      firstname: data.firstname,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }; 
    const token = jwt.sign(dataToken, process.env.APP_KEY_TOKEN);

    return response.json({
      data: data,
      token: token,
    });
  }
  return response.json({
    message: "Login ou senha incorreto",
  });
});

module.exports = PublicRoutes;
