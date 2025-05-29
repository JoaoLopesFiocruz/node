// routes/users.routes.js
import { Router } from 'express';

const usersRoutes = Router();

usersRoutes.post('/', (req, res) => {
  const { name, email, password } = req.body;
  res.json({ name, email, password });
});

export default usersRoutes;
