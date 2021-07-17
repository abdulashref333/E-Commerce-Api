const bodyParser = require('body-parser');
const express = require('express');
const customerRoutes = require('./routes/customer.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const autheRoutes = require('./routes/authenticat.route');
const httpStatusCodes = require('./models/errors/httpStatusCodes');

const {logErrorMiddleware, returnError, logError, isOperationalError} = require('./util/errorHandler');

const app = express();
app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    }
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1/', autheRoutes);
app.use('/api/v1', customerRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);
app.use(logErrorMiddleware);
app.use(returnError);

module.exports = app;