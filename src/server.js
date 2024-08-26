/** @format */

const app = require('./app');
const db = require('./config/database/db');

// connect to the database
db();
// connect to the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Store API is running on port http://localhost:${port}`);
});
