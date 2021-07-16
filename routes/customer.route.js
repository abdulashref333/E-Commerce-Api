const route = require('express').Router();
const {Customer} = require('../controllers/customer.control');
const authenticat = require('../util/jwt');

route.get('/profile',  authenticat.verifyToken, Customer.getProfile);

route.get('/customers', Customer.getCustomers);

route.post('/customer', Customer.creatCustomer);

route.put('/customer', Customer.updateCustomer);

route.delete('/customer/:id', Customer.deleteCustomer);
module.exports = route;