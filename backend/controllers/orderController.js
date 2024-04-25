const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorhandler')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//create a new Order => /api/v1/order/new
exports.newOrder = catchAsyncErrors( async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.send(200).json({
        success: true,
        order
    })
})