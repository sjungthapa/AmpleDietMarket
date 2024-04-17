const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products');

// setting dotenv file
dotenv.config({ path: 'backend/config/config.env'})

connectDatabase();

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Product are deleted successfully')

        await Product.insertMany(products);
        console.log('Product are inserted successfully')

        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();
