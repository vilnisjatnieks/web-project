const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name: String,
    developer: String, 
    genre: String,
    description: String,
    added: {type: Date, default: Date.now}
});

const gameModel = mongoose.model('game', gameSchema);


//CRUD
exports.create = async function(game){
    const mongoGame = new gameModel(game);
    await mongoGame.save();
    return mongoGame;
}

exports.read = async function(gid){
    const lstGame = await gameModel.findById(gid);
    return lstGame;
}

exports.readAll = async function(){
    const lstGames = await gameModel.find();
    return lstGames;
}

exports.update = async function(game){
    const updData = {
        name: game.name,
        developer: game.developer,
        genre: game.genre,
        description: game.description,
    };

    const updGame = await gameModel.findByIdAndUpdate(
        game._id, updData, {new: true, runValidators: true});

    if(!updGame){
        return null;
    }

    return updGame;
}

exports.del = async function(gid){
    const delGame = await gameModel.findByIdAndDelete(gid);
    return delGame;
}

exports.deleteAll = async function(){
    const delGames = await gameModel.deleteMany();
    return delGames;
}