/** @format */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

// base url for Home routes
app.get('/', (req, res) => {
  res.send({
    Home: 'Welcome to Store Apis',
  });
});

// connect to Database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection Successful'))
  .catch((err) => {
    console.log(err);
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

// connect to the server
app.listen(process.env.PORT | 5000, () => {
  console.log('Backend sever is running');
});
