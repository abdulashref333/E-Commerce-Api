const route = require('express').Router();
const {Product} = require('../controllers/product.control');


route.get('/products', Product.getproducts);

route.post('/product', Product.creatproduct);

route.put('/product/:id', Product.updateProduct);

route.delete('/product/:id', Product.deleteProduct);

module.exports = route;