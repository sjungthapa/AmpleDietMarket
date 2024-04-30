const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");


app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use(fileUpload());



app.use(cookieParser());


const dotenv = require("dotenv");

app.use(express.json());

dotenv.config({ path: "Backend/config/config.env" });

// Importing the routes
const product = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

// Mounting the routes
app.use('/api/v1', product);
app.use('/api/v1', auth);
app.use('/api/v1', order);




module.exports = app;
