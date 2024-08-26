/** @format */
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const authRoute = require('./v1/routes/auth');
const userRoute = require('./v1/routes/user');
const productRoute = require('./v1/routes/product');
const cartRoute = require('./v1/routes/cart');
const orderRoute = require('./v1/routes/order');

// base url for Home routes
app.get('/', (req, res) => {
  res.send({
    Home: 'Welcome to Store Apis',
  });
});

app.use(express.json());
app.use(cors());
app.use(helmet());

// routes for endpoints
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

module.exports = app;
