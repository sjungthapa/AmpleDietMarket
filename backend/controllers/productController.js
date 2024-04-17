const Product = require('../models/product');

const ErrorHandler = require('../utils/errorhandler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require("cloudinary");

//create new product => /api/v1/product/new
exports.newProduct = async (req, res, next) => {
    let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;


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

//Get all products (Admin) => /api/v1/admin/products?
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });


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

//Update product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    if (images !== undefined) {
      for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          product.images[i].public_id
        );
      }
  
      let imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  });

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