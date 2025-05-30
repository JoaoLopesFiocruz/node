// routes/users.routes.js
import { Router } from 'express';
import UserControler from '../controllers/UsersController.js'

const usersRoutes = Router();

usersRoutes.post('/',UserControler.create);
export default usersRoutes;
