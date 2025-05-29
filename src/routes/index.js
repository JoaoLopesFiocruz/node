import { Router } from 'express';
import usersRoutes from './users.routes.js';

const routes = Router();

// Definindo o prefixo '/user' para as rotas de usuário
routes.use('/users', usersRoutes);

export default routes;