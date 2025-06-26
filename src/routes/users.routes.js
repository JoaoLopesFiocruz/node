// routes/users.routes.js
const { Router } = require('express');
const UserControler = require('../controllers/UsersController.js')

const usersRoutes = Router();

usersRoutes.post('/',UserControler.create);
module.exports= usersRoutes;
