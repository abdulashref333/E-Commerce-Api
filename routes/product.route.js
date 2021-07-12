const route = require('express').Router();
const {Product} = require('../controllers/product.control');


route.get('/products', async (req, res) => {
    Product.getproducts(req, res);
});

route.post('/product', (req, res) => {
    Product.creatproduct(req, res);
})

module.exports = route;