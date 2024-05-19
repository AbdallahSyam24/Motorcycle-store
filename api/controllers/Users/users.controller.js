require('./users.model');
const mongoose = require("mongoose");

const users = mongoose.model(process.env.COLLECTION_USERS);
const helper = require("../../helpers");

const registration = (req, res) => {
    const validate = helper.validate([req.body.name, req.body.email, req.body.password]);

    if (!validate) {
        helper.sendResponse(res, process.env.ERROR_STATUS_CODE, "name, email, password are req");
    } else {
        let results = {
            "status": process.env.SUCCESS_STATUS_CODE,
            "data": []
        };

        const salt = helper.generateSalt();
        const hashedPassword = helper.hashedPassword(req.body.password, salt);

        users.insertMany({
            "name": req.body.name,
            "email": req.body.email,
            "password": hashedPassword
        }).then((response) => results.data = response)
            .catch((e) => {
                results.status = process.env.ERROR_STATUS_CODE;
                results.data = e.message;
            })
            .finally(() => helper.sendResponse(res, results.status, results));
    }
}

const login = (req, res) => {
    const validate = helper.validate([req.body.email, req.body.password]);
    if (!validate) {
        helper.sendResponse(res, process.env.ERROR_STATUS_CODE, "Internal server error");
    } else {
        let results = {
            "status": process.env.SUCCESS_STATUS_CODE,
            "data": {}
        };

        users.findOne({ "email": req.body.email })
            .then((response) => helper.isPasswordMatch(response, req.body.password, response.password))
            .then((response) => results.data = response)
            .catch(() => {
                results.status = 400;
                results.data = { "msg": "check email or password" };
            })
            .finally(() => helper.sendResponse(res, results.status, results));
    }
}


module.exports = {
    registration,
    login
}