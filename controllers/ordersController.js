const model = require('../models/productsOrdersModel');
const Order = model.retOrders();
const mongoose = require('mongoose');

module.exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).exec();
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

module.exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).exec();

        if(order) {
            res.status(200).json(order);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.createNewOrder = async (req, res, next) => {
    if (!req.body.selectedProducts || !req.body.customerName || !req.body.customerEmail || !req.body.address) {
        res.status(400).send();
    } else {
        try {
            const newOrder = new Order({
                _id: new mongoose.Types.ObjectId(),
                selectedProducts: req.body.selectedProducts,
                customerName: req.body.customerName,
                customerEmail: req.body.customerEmail,
                address: req.body.address,
            });
            await newOrder.save();

            res.status(201).json(newOrder);
        } catch (err) {
            next(err);
        }
        }
};


module.exports.deleteOrderById = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id).exec();

        if(order) {
            res.status(200).json(order);
            
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};