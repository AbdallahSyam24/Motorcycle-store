require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const routes = require('./api/routes');
require('./api/database/DB');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', cors());


app.use('/api', routes);

const server = app.listen(process.env.PORT, () => {
    console.log("Listening on port", server.address().port);
});