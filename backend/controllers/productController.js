const Product = require('../models/product');

const ErrorHandler = require('../utils/errorhandler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const APIFeatures = require('../utils/apiFeatures');

//create new product => /api/v1/product/new
exports.newProduct = async (req, res, next) => {

    req.body.user = req.user.id;


    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product
    })
}

// get all products => api/v1/products

exports.getProducts = async (req, res,next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    })
}

// get single product => api/v1/products/:id

exports.getSingleProduct = async (req, res,next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}

//update product

exports.updateProduct = async (req, res,next) => {

    let product = await Product.findByIdAndUpdate(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.prams.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    } )
    res.status(200).json({
        success: true,
        product
    })
}

//delete product

exports.deleteProduct = async (req,res,next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
}