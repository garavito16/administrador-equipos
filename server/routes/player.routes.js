const express = require('express');
const PlayerRouter = express.Router();

const PlayerController = require('../controllers/player.controller');

PlayerRouter.get('/all',PlayerController.getAll);
PlayerRouter.post('/new',PlayerController.create);
PlayerRouter.get('/:id',PlayerController.getId);
PlayerRouter.put('/edit/:id',PlayerController.update);
PlayerRouter.delete('/delete/:id',PlayerController.delete);

module.exports = PlayerRouter;