// routes/users.routes.js
const { Router } = require('express');
const NotesController = require('../controllers/NotesController')

const notesRoutes = Router();

notesRoutes.post('/:user_id',NotesController.create);
notesRoutes.get('/:id',NotesController.show);
notesRoutes.delete('/:id',NotesController.delete);
notesRoutes.get('/',NotesController.index);
module.exports= notesRoutes;
