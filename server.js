const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const customerRoutes = require('./routes/customer.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const autheRoutes = require('./routes/authenticat.route');
const {logErrorMiddleware, returnError, logError, isOperationalError} = require('./util/errorHandler');

process.on('uncaughtException', err => {
    logError(err);
    if(!isOperationalError(err)){
        process.exit(1);
    }
})

process.on('unhandledRejection', err => {
    throw err;
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1/', autheRoutes);
app.use('/api/v1', customerRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);
app.use(logErrorMiddleware);
app.use(returnError);

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
})