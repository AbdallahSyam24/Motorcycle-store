const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", (e) => {
    console.log("Mongoose error", e);
});