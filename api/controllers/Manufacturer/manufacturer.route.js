const express = require("express");
const routes = express.Router();

const upload = require("../../helpers/upload");

const manufacturerController = require("./manufacturer.controller");

routes.route('/')
    .get(manufacturerController.getAllManufacturers)
    .post(manufacturerController.createManufacturer);

routes.route('/:manufacturerID')
    .get(manufacturerController.getManufacturerByID)
    .delete(manufacturerController.deleteManufacturerByID)
    .put(upload.single('logo'), manufacturerController.fullUpdateManufacturerByID);


routes.route('/:manufacturerID/models')
    .get(manufacturerController.getAllManufacturerModels)
    .post(manufacturerController.createManufacturerModels)

routes.route('/:manufacturerID/models/:modelID')
    .get(manufacturerController.getManufacturerModelsByID)
    .delete(manufacturerController.deleteManufacturerModelsByID)
    .patch(manufacturerController.updateManufacturerModelsByID)
    .put(manufacturerController.fullUpdateManufacturerModelsByID);


module.exports = routes;