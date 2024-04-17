const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

const dotenv = require("dotenv");

app.use(express.json());

dotenv.config({ path: "Backend/config/config.env" });

// Importing the routes
const products = require('./routes/product');
const auth = require('./routes/auth');

// Mounting the routes
app.use('/api/v1', products);
app.use('/api/v1', auth);

module.exports = app;
