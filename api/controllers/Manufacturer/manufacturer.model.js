const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "cc": {
        type: Number,
        required: true,
    },
    "year": {
        type: Number,
        required: true,
    }
});

const manufacturerSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "country": {
        type: String,
        required: true
    },
    "year": {
        type: Number,
        required: true
    },
    "logo": {
        type: String
    },
    "models": {
        type: [modelSchema],
        required: false
    }
});

mongoose.model(process.env.COLLECTION_MANUFACTURERS, manufacturerSchema);