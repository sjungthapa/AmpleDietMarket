const express = require('express');
const router = express.Router();

const { getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct } = require("../controllers/productController")

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/products').get(getProducts);

router.route('/products/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
;

router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
                            .delete(isAuthenticatedUser, authorizeRoles('admin'),deleteProduct);

router.route('/product/new').post(newProduct);

module.exports = router;