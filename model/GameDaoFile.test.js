const fs = require('fs').promises;
const path = require('path');
const dao = require('./GameDaoFile');

const FILE_PATH = path.join(__dirname, 'games.json');

const seedGames = [
    { _id: 1, name: "Marvel Rivals", developer: "NetEase Games", genre: "Hero Shooter", description: "A team-based hero shooter featuring Marvel characters." },
    { _id: 2, name: "Elden Ring", developer: "FromSoftware", genre: "Action RPG", description: "An open-world action RPG set in the Lands Between." },
    { _id: 3, name: "Hades II", developer: "Supergiant Games", genre: "Roguelike", description: "A roguelike following Melinoe against the Titan of Time." }
];

let originalContent;

beforeAll(async () => {
    originalContent = await fs.readFile(FILE_PATH, 'utf8');
});

beforeEach(async () => {
    await fs.writeFile(FILE_PATH, JSON.stringify(seedGames, null, 2));
});

afterAll(async () => {
    await fs.writeFile(FILE_PATH, originalContent);
});

test("readAll returns all seeded games", async function () {
    const games = await dao.readAll();
    expect(games.length).toBe(3);
});

test("create adds a new game with an auto-generated id", async function () {
    const newGame = { name: "Cyberpunk 2077", developer: "CD Projekt Red", genre: "Action RPG", description: "Open-world RPG in Night City." };
    const created = await dao.create(newGame);

    expect(created._id).toBeDefined();
    expect(created._id).toBe(4);
    expect(created.name).toBe("Cyberpunk 2077");

    const all = await dao.readAll();
    expect(all.length).toBe(4);
});

test("read returns the correct game by id", async function () {
    const game = await dao.read(2);
    expect(game).not.toBeNull();
    expect(game.name).toBe("Elden Ring");
});

test("read returns null for a nonexistent id", async function () {
    const game = await dao.read(999);
    expect(game).toBeNull();
});

test("update changes game fields and persists", async function () {
    const updated = { _id: 1, name: "Marvel Rivals Updated", developer: "NetEase Games", genre: "Hero Shooter", description: "Updated description." };
    const result = await dao.update(updated);

    expect(result).not.toBeNull();
    expect(result.name).toBe("Marvel Rivals Updated");

    const found = await dao.read(1);
    expect(found.name).toBe("Marvel Rivals Updated");
});

test("update returns null for a nonexistent id", async function () {
    const result = await dao.update({ _id: 999, name: "Ghost" });
    expect(result).toBeNull();
});

test("del removes the game from the list", async function () {
    await dao.del(2);
    const all = await dao.readAll();
    expect(all.length).toBe(2);
    const found = await dao.read(2);
    expect(found).toBeNull();
});

test("deleteAll empties the games list", async function () {
    await dao.deleteAll();
    const all = await dao.readAll();
    expect(all.length).toBe(0);
});
