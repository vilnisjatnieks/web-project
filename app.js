const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static('view'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let lstGames = [
    { _id: 1, name: "Marvel Rivals", developer: "NetEase Games" },
    { _id: 2, name: "Dead Island", developer: "Deep Silver" },
    { _id: 3, name: "EA Sports FC 26", developer: "EA (Vancouver & Romania)" },
    { _id: 4, name: "Cyberpunk 2077", developer: "CD Projekt Red" },
    { _id: 5, name: "Elden Ring", developer: "FromSoftware" },
    { _id: 6, name: "Grand Theft Auto VI", developer: "Rockstar Games" },
    { _id: 7, name: "Baldur's Gate 3", developer: "Larian Studios" },
    { _id: 8, name: "Hades II", developer: "Supergiant Games" }
];

app.get("/games", function (req, res) {
    res.status(200);
    res.send(lstGames);
    res.end();
});

app.get("/game/:game_id", function (req, res) {
    let game_id = parseInt(req.params.game_id);
    let game = lstGames.find(g => g._id === game_id);

    if (game) {
        res.status(200).json(game);
    } else {
        res.status(404).json({ error: "Game not found" });
    }
});

module.exports = app;
