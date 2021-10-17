const model = require('../models/productsOrdersModel');
const Product = model.retProducts();
const mongoose = require('mongoose');

module.exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({}).exec();
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

module.exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).exec();

        if(product) {
            res.status(200).json(product);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.addNewProduct = async (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        res.status(400).send();
    } else {
        try {
            const newProduct = new Product({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            });
            await newProduct.save();

            res.status(201).json(newProduct);
        } catch (err) {
            next(err);
        }
        }
};

module.exports.updateProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).exec();

        if (product) {
            const updatedInfo = req.body;

            if (updatedInfo.name == product.name &&
                updatedInfo.price == product.price &&
                updatedInfo.description == product.description) {
                    res.status(400).send();
            } else {
                Product.updateOne(
                    {
                    _id: req.params.id
                    }, 
                    {
                        name: updatedInfo.name,
                        price: updatedInfo.price,
                        description:updatedInfo.description
                    }).exec();
                res.status(200).send();
            }
                
                
        }
    } catch (err) {
        next(err);
    }
};

module.exports.deleteProductById = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).exec();

        if(product) {
            res.status(200).json(product);
            
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};