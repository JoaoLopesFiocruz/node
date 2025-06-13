const Router = require('express');
const usersRoutes = require('./users.routes');

const routes = Router();

// Definindo o prefixo '/user' para as rotas de usuário
routes.use('/users', usersRoutes);

module.exports = routes;