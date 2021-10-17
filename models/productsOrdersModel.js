const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        maxLength: 200,
    },

});

const ordersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    selectedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    }],
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const productsModel = mongoose.model('products', productsSchema);
const ordersModel = mongoose.model('orders', ordersSchema);

module.exports = {
    retProducts: function () {
        return productsModel;
    },
    retOrders: function () {
        return ordersModel;
    }
};