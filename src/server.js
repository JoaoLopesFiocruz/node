// app.js
import routes from './routes/index.js';
import appError from './utils/AppError.js';
import express from 'express';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(((err,req, res, next) => {
  if (err instanceof appError) {
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
