const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sendResponse = (res, statusCode, results) => {
    statusCode = parseInt(statusCode);
    res.status(statusCode).json(results);
}

const auth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            sendResponse(res, process.env.ERROR_STATUS_CODE, { "msg": "Please add the header's authorization to the request" });
            return;
        }
        const arr = req.headers.authorization.split(" ");
        if (arr.length !== 2) {
            sendResponse(res, process.env.ERROR_STATUS_CODE, { "msg": "Please use the Bearer scheme" });
            return;
        }
        const token = arr[1];
        let decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.email = decoded.email;
        next();
    } catch (error) {
        sendResponse(res, process.env.ERROR_STATUS_CODE, { "msg": "Wrong token" });
    }
}

const createToken = (email) => {
    const token = jwt.sign({ email: email }, process.env.PRIVATE_KEY);
    return token;
}

const generateSalt = () => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const slat = bcrypt.genSaltSync(saltRounds);
    return slat;
}

const isPasswordMatch = (userData, password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        if (userData) {
            if (bcrypt.compareSync(password, hashedPassword)) {
                const token = createToken(userData.email);
                const user = {
                    "_id": userData._id.toString(),
                    "name": userData.name,
                    "email": userData.email,
                    "token": token
                }
                resolve(user);
            } else {
                reject();
            }
        } else {
            reject();
        }
    });
};

const hashedPassword = (password, salt) => bcrypt.hashSync(password, salt);

const validate = (fields) => {
    for (const key in fields) {
        if (!fields[key]) {
            return false;
        }
    }

    return true;
}

module.exports = {
    sendResponse,
    generateSalt,
    hashedPassword,
    validate,
    isPasswordMatch,
    auth,
    createToken
}