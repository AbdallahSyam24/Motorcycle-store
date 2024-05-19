const express = require("express");
const routes = express.Router();

const { auth } = require('../helpers');

const manufacturerRoutes = require("../controllers/Manufacturer/manufacturer.route");
const usersRoutes = require("../controllers/Users/users.route");

routes.use('/', usersRoutes);
routes.use(auth);
routes.use('/manufacturers', manufacturerRoutes);

module.exports = routes;