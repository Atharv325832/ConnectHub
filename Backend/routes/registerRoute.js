const express = require('express');

const routes = express.Router();
const authController = require('../controllers/authController');

routes.post('/register', authController.registerData);
routes.post('/login', authController.loginData);
routes.post('/logout', authController.logoutData);

module.exports = routes;