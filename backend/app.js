const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;

const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


const dotenv = require("dotenv");

app.use(express.json());

dotenv.config({ path: "Backend/config/config.env" });

// Importing the routes
const product = require('./routes/product');
const auth = require('./routes/auth');

// Mounting the routes
app.use('/api/v1', product);
app.use('/api/v1', auth);

module.exports = app;
