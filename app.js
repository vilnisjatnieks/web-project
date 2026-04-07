const express = require('express');
const morgan = require('morgan');
const gameCont = require('./controller/GameController');

const app = express();

app.use(morgan('dev'));
app.use(express.static('view'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/games', gameCont.getAll);
app.get('/game/:game_id', gameCont.get);
app.post('/game', gameCont.postCreateUpdate);
app.get('/deletegame/:game_id', gameCont.getDelete);

module.exports = app;
