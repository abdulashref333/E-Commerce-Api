const route = require('express').Router();
const {Category} = require('../controllers/category.control');


route.get('/categories', Category.getcategorys);

route.post('/category', Category.creatcategory);

route.put('/category/:id', Category.updateCategory);

route.delete('/category/:id', Category.deleteCategory);

module.exports = route;