// routes/users.routes.js
const { Router } = require('express');
const NotesController = require('../controllers/NotesController')

const notesRoutes = Router();

notesRoutes.post('/:user_id',NotesController.create);
module.exports= notesRoutes;
