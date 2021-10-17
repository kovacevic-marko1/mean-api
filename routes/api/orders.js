const express = require('express');
const router = express.Router();

const ordersController = require('../../controllers/ordersController.js');

//GET http://localhost:3000/api/orders
router.get('/', ordersController.getOrders);

//GET http://localhost:3000/api/orders/:id
router.get('/:id', ordersController.getOrderById);

//POST http://localhost:3000/api/orders
router.post('/', ordersController.createNewOrder);

//DELETE http://localhost:3000/api/orders/:id
router.delete('/:id', ordersController.deleteOrderById);


module.exports = router;