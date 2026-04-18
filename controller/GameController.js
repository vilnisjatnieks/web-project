const dao = require('../model/GameDaoMongoose');

exports.getAll = async function (req, res) {
    res.status(200);
    res.send(await dao.readAll());
    res.end();
};

exports.get = async function (req, res) {
    let game_id = parseInt(req.params.game_id);
    let game = await dao.read(game_id);

    if (game != null) {
        res.status(200);
        res.send(game);
        res.end();
    } else {
        res.status(404);
        res.send({ msg: 'Game with this ID does not exist' });
        res.end();
    }
};

exports.postCreateUpdate = async function (req, res) {
    let gname = req.body.txt_name;
    let gdeveloper = req.body.txt_developer;
    let ggenre = req.body.txt_genre;
    let gdescription = req.body.txt_description;

    if (req.body.txt_id && req.body.txt_id !== '') {
        let gid = parseInt(req.body.txt_id);
        let updatedGame = { _id: gid, name: gname, developer: gdeveloper, genre: ggenre, description: gdescription };
        await dao.update(updatedGame);
    } else {
        let newGame = { name: gname, developer: gdeveloper, genre: ggenre, description: gdescription };
        await dao.create(newGame);
    }

    res.redirect('/?manage=1');
};

exports.getDelete = async function (req, res) {
    let game_id = parseInt(req.params.game_id);
    await dao.del(game_id);
    res.redirect('/?manage=1');
};