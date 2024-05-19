const express = require("express");
const routes = express.Router();

const usersController = require("./users.controller");

routes.route('/registration')
.post(usersController.registration);

routes.route('/login')
.post(usersController.login);

module.exports = routes;