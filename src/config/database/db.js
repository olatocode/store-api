/** @format */

const mongoose = require('mongoose');

// connect to Database
const db = async () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = db;
