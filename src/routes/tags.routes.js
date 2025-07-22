// routes/users.routes.js
const { Router } = require('express');
const TagsControler = require('../controllers/TagsControler')

const tagsRoutes = Router();

tagsRoutes.get('/:user_id',TagsControler.index);
module.exports= tagsRoutes;
