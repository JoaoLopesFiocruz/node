// app.js
const express = require('express');
const routes = require('./routes/index');
const AppError = require('./utils/AppError');
const database = require('./database/sqlite/migracions/index');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
console.log(typeof(database))
database();

app.use(((err,req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Quebrou o bagulho todo',
  });
}));
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
