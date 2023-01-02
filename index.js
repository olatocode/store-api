/** @format */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection Successful'))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);


app.listen(process.env.PORT | 5000, () => {
  console.log('Backend sever is running');
});
