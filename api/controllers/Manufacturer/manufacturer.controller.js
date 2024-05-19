require('./manufacturer.model');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const manufacturers = mongoose.model(process.env.COLLECTION_MANUFACTURERS);
const { sendResponse } = require("../../helpers/");

const getAllManufacturers = (req, res) => {
    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    const offset = (req.query.offset) ? parseInt(req.query.offset) : 0;
    const perPage = 5;

    manufacturers.find()
        .select(['name', 'country', 'year', 'logo'])
        .skip(offset * perPage).limit(perPage)
        .then((response) => results.data = response)
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));

}

const createManufacturer = (req, res) => {
    const manufacturerData = req.body;

    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    manufacturers.create(manufacturerData)
        .then((response) => results.data = { "id": response._doc._id })
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

const getManufacturerByID = (req, res) => {
    const manufacturerID = req.params.manufacturerID;
    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    manufacturers.findById(manufacturerID)
        .select(['name', 'country', 'year', 'logo'])
        .then((response) => results.data = response)
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

const deleteManufacturerByID = (req, res) => {
    const manufacturerID = req.params.manufacturerID;
    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    manufacturers.deleteOne({ "_id": manufacturerID })
        .then(() => results.data = { "success": true })
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

const fullUpdateManufacturerByID = (req, res) => {

    const manufacturerID = req.params.manufacturerID;
    const manufacturerData = req.body;

    if (req.file) {
        manufacturerData.logo = req.file.filename;
    }


    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    manufacturers.findOneAndUpdate({ "_id": manufacturerID }, manufacturerData)
        .then(() => {
            results.data = { "success": true };
        })
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

const getAllManufacturerModels = (req, res) => {
    const manufacturerID = req.params.manufacturerID;
    const objectId = new ObjectId(manufacturerID);

    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    const offset = (req.query.offset) ? parseInt(req.query.offset) : 0;
    const perPage = 5;

    manufacturers.aggregate([
        {
            $match: {
                "_id": objectId
            }
        },
        {
            $project: {
                modles: {
                    $slice: ["$models", offset * perPage, perPage]
                }
            }
        }
    ])
        .then((response) => results.data = response[0])
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

const createManufacturerModels = (req, res) => {
    const manufacturerID = req.params.manufacturerID;
    const modelsData = req.body;

    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    manufacturers.updateOne(
        { "_id": manufacturerID },
        { $push: { "models": modelsData } })
        .then(() => results.data = { "success": true })
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

const getManufacturerModelsByID = (req, res) => {
    const manufacturerID = req.params.manufacturerID;
    const modelID = req.params.modelID;

    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };


    manufacturers.findOne({ "_id": manufacturerID, "models._id": modelID }).select("models.$")
        .then((response) => results.data = response.models[0])
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

const deleteManufacturerModelsByID = (req, res) => {
    const manufacturerID = req.params.manufacturerID;
    const modelID = req.params.modelID;

    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    manufacturers.updateOne({ _id: manufacturerID }, {
        $pull: {
            models: { _id: modelID },
        },
    })
        .then(() => results.data = { "success": true })
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

const updateManufacturerModelsByID = (req, res) => {
    const manufacturerID = req.params.manufacturerID;
    const modelID = req.params.modelID;
    const modelsData = req.body;

    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    const { name, cc, year } = modelsData;
    manufacturers.findOneAndUpdate(
        { "_id": manufacturerID, "models._id": modelID },
        {
            $set: {
                "models.$.name": name,
                "models.$.cc": cc,
                "models.$.year": year
            }
        })
        .then(() => results.data = { "success": true })
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

const fullUpdateManufacturerModelsByID = (req, res) => {
    const manufacturerID = req.params.manufacturerID;
    const modelID = req.params.modelID;
    const modelsData = req.body;

    let results = {
        "status": process.env.SUCCESS_STATUS_CODE,
        "data": {}
    };

    manufacturers.findOneAndUpdate(
        { "_id": manufacturerID, "models._id": modelID },
        { $set: { "models": modelsData } })
        .then(() => results.data = { "success": true })
        .catch((e) => {
            results.status = process.env.ERROR_STATUS_CODE;
            results.data = e.message;
        })
        .finally(() => sendResponse(res, results.status, results));
}

module.exports = {
    getAllManufacturers,
    createManufacturer,
    fullUpdateManufacturerByID,
    deleteManufacturerByID,
    getManufacturerByID,
    getAllManufacturerModels,
    createManufacturerModels,
    getManufacturerModelsByID,
    deleteManufacturerModelsByID,
    updateManufacturerModelsByID,
    fullUpdateManufacturerModelsByID
}