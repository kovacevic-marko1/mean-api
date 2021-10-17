const { urlencoded, json } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//********database********
const databaseString = "mongodb://localhost:27017/shop";
mongoose.connect(databaseString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', function () {
    console.log('Database Connected...');
});

mongoose.connection.on('error', error => {
    console.log('Err: ', error);
});
//********database********

app.use(json());
app.use(urlencoded({extended: false}));

// const productsRoutes = require('./routes/api/products');
// const ordersRoutes = require('./routes/api/orders')

// app.use('/api/products', productsRoutes);
// app.use('/api/orders', ordersRoutes);

app.use('/api/products', require('./routes/api/products'));
app.use('/api/orders', require('./routes/api/orders'));

//********err handle********
app.use(function (req, res, next) {
    const error = new Error('Unknown request');
    error.status = 405;
    next(error);
});

app.use(function (error, req, res, next) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        error: {
            message: error.message,
            status: statusCode,
            stack: error.stack
        },
    });
});
//********err handle********

module.exports = app;