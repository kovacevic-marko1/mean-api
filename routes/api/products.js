const express = require('express');
const router = express.Router();

const productsController = require('../../controllers/productsController.js');

//GET http://localhost:3000/api/products
router.get('/', productsController.getProducts);

//GET http://localhost:3000/api/products/:id
router.get('/:id', productsController.getProductById);

//POST http://localhost:3000/api/products
router.post('/', productsController.addNewProduct);

//PUT http://localhost:3000/api/products/:id
router.put('/:id', productsController.updateProductById);

//DELETE http://localhost:3000/api/products/:id
router.delete('/:id', productsController.deleteProductById);


module.exports = router;