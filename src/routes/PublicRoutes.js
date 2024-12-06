const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthController = require('../controllers/AuthController');

const PublicRoutes = express.Router();

PublicRoutes.post('/login', (request, response) => {
  const body =request.body;
  const auth = new AuthController();
  const data = auth.login(body.login, body.senha);
  if (data){
    const token = jwt.sign(data, process.env.APP_KEY_TOKEN);
    return response.json({
      token: token
    })
  }
  return response.json({
    message: "Login ou senha incorreto"
  })
});

module.exports = PublicRoutes;