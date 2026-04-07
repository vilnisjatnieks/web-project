const express = require('express');
const morgan = require('morgan');
const gameController = require('./controller/GameController');

const app = express();

app.use(morgan('dev')); //For better logging, we use morgan
app.use(express.static('view')); // Static page server will use the folder 'view'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/games', gameController.getAll);
app.get('/game/:game_id', gameController.get);
app.post('/game', gameController.postCreateUpdate);
app.get('/deletegame/:game_id', gameController.getDelete);

module.exports = app;
