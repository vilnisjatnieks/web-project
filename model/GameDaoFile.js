const fs = require('fs').promises;
const path = require('path');

const FILE_PATH = path.join(__dirname, 'games.json');

exports.readAll = async function () {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(data);
};

exports.read = async function (gid) {
    const lstGames = await exports.readAll();
    for (let i = 0; i < lstGames.length; i++) {
        if (lstGames[i]._id === gid) return lstGames[i];
    }
    return null;
};

exports.create = async function (game) {
    const lstGames = await exports.readAll();
    let genId = lstGames.length > 0 ? lstGames[lstGames.length - 1]._id + 1 : 1;
    game._id = genId;
    lstGames.push(game);
    await fs.writeFile(FILE_PATH, JSON.stringify(lstGames, null, 2));
    return game;
};

exports.update = async function (game) {
    const lstGames = await exports.readAll();
    for (let i = 0; i < lstGames.length; i++) {
        if (lstGames[i]._id === game._id) {
            lstGames[i] = game;
            await fs.writeFile(FILE_PATH, JSON.stringify(lstGames, null, 2));
            return game;
        }
    }
    return null;
};

exports.del = async function (gid) {
    const lstGames = await exports.readAll();
    const filtered = lstGames.filter(g => g._id !== gid);
    await fs.writeFile(FILE_PATH, JSON.stringify(filtered, null, 2));
};

exports.deleteAll = async function () {
    await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2));
};
