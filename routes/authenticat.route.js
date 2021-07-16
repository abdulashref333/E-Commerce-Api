const route = require('express').Router();
const Auth = require('../controllers/authenticat.control');


route.post('/signin', Auth.signIn);


module.exports = route;