const test = require('node:test');
const dbcon = require('./DbConnection');
const dao = require('./GameDaoMongoose');

beforeAll(async()=>{
    await dbcon.connect('test');
});

afterAll(async()=>{
    await dao.gameModel.deleteMany({});
    await dbcon.disconnect();
});

beforeEach(async()=>{
    await dao.gameModel.deleteMany({});
});

/*Test Create Game*/
test('Create new game successful', async()=>{
    let newGameData = {name: 'Dispatch', developer: 'AdHoc Studio', genre: 'Choices Matter', 
        description: ' play as Robert Robertson, a former hero forced to work as a dispatcher managing the "Z Team".'};
    let createdGame = await dao.create(newGameData);
    let foundGame = await dao.readById(createdGame._id);
    expect(createdGame._id).not.toBeNull();
    expect(foundGame.name).toBe(createdGame.name);
});

test('Create new game failure', async()=>{
    expect.assertion(1);
    try{
        await dao.create({developer: 'AdHoc Studio', genre: 'Choices Matter'});
    }catch(err){expect(err.name).toBe('ValidationError');}
});

/*Test Read Game*/
test('Read all games', async()=>{
    let game1 = {name:'one', developer:'devOne', genre:'Indie', description:'lorem ipsum'};
    let game2 = {name:'two', developer:'devTwo', genre:'Indie', description:'lorem ipsum'};
    let game3 = {name:'three', developer:'devThree', genre:'Indie', description:'lorem ipsum'};
    
    await dao.create(game1);
    await dao.create(game2);
    await dao.create(game3);

    let lstGames = await dao.readAll();
    expect(lstGames.length).toBe(3);
    expect(lstGames[0].name).toBe('one');
});