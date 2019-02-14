const express = require('express');
const TweetController = require('./controllers/TweetController');

const routes = express.Router();

// Mapeamento de rotas com as actions das controllers
routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.store);
routes.put('/tweets/:id/like', TweetController.updateLike);

module.exports = routes;