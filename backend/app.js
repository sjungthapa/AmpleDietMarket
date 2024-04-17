const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

app.use(express.json());

// Importing the routes
const products = require('./routes/product');
const auth = require('./routes/auth');

// Mounting the routes
app.use('/api/v1', products);
app.use('/api/v1', auth);

module.exports = app;
