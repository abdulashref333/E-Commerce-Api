const route = require('express').Router();
const {Customer} = require('../controllers/customer.control');


route.get('/customers', Customer.getCustomers);

route.post('/customer', Customer.creatCustomer);

route.put('/customer', Customer.updateCustomer);

module.exports = route;