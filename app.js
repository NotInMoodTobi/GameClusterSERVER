const express = require("express");
const { get } = require("request");
const request = require("request");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./apiFunctions");

const steam = require("./steamHelper");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// router
const gameRouter = require("./routes/game/game");
const genreRouter = require("./routes/genre/genre");
const publisherRouter = require("./routes/publisher/publisher");
const steamRouter = require("./routes/steam/steam");

// router middleware
app.use("/game", gameRouter);
app.use("/genre", genreRouter);
app.use("/publisher", publisherRouter);
app.use("/steam", steamRouter);

//SteamAPI Tester
app.get("/steamapps", async (req, res) => {
  const apps = await steam.searchGame(req.body);
  res.status(200).json({ apps });
});
app.get("/steamapps/get-name-from-id", async (req, res) => {
  const apps = await steam.sarchGameNameFromId(req.body);
  res.status(200).json({ apps });
});
app.get("/steamapps/get-details", async (req, res) => {
  const apps = await steam.getAllGameDetails(req.body);
  res.status(200).json({ apps });
});

// --- game operations ---

// get all games
app.get("/games", async (req, res) => {
  const games = await db.getAllGames();
  console.log(games);
  res.status(200).json({ games });
});

// get game by id
app.get("/games/:id", async (req, res) => {
  const game = await db.getGameById(req.params.id);
  res.status(200).json({ game });
});

// TODO: nicht fertig, testen
// create game
app.post("/games", async (req, res) => {
  const results = await db.createGame(req.body);
  res.status(201).json({ id: results[0] });
});

// TODO: nichts fertig, testen
// update game
app.patch("/games/:id", async (req, res) => {
  const id = await db.updateGame(req.params.id, req.body);
  res.status(200).json({ id });
});

// soft delete
app.delete("/games/:id", async (req, res) => {
  const result = await db.deleteGame(req.params.id);
  res.status(200).json({ succcess: true });
});

// --- steamAPI --- //

// TODO: nicht fertig
// load data from steamAPI into game
app.patch("/steam-data-to-game/:id", async (req, res) => {
  // const id = await db.(req.params.id, req.body);
  res.status(200).json({ id });
});

// --- genre operations --- //

// get all genre
app.get("/genre", async (req, res) => {
  const genres = await db.getAllGenre();
  res.status(200).json({ genres });
});

app.get("/genre/:id", async (req, res) => {
  const genre = await db.getGenreById(req.params.id);
  res.status(200).json({ genre });
});

// create genre
app.post("/create-genre", async (req, res) => {
  const results = await db.createGenre(req.body);
  res.status(200).json({ results });
});

// get genre from game
app.get("/get-genre-from-game", async (req, res) => {
  const results = await db.getGenreFromGame(req.body.game_id);
  res.status(200).json({ results });
});

// add genre to game
// TODO: results überarbeiten
app.post("/add-genre-to-game", async (req, res) => {
  const results = await db.addGenreToGame(req.body);
  res.status(200).json({ results });
});

// get genre from game by game_id
app.get("/get-genre-from-Game/:id", async (req, res) => {
  const genre = await db.getGenreFromGame(req.params.id);
  res.status(200).json({ genre });
});

// remove genre from game
app.delete("/remove-genre-from-game", async (req, res) => {
  const results = await db.removeGenreFromGame(req.body);
  res.status(200).json({ results });
});

// hard delete genre
app.delete("/delete-genre/:id", async (req, res) => {
  const results = await db.deleteGenre(req.params.id);
  res.status(200).json({ results });
});

// delete genre by id
app.delete("/delete-genre/:id", async (req, res) => {
  const results = await db.deleteGenre(req.params.id);
  res.status(200).json({ results });
});

// --- publisher operations ---

app.get("/publisher", async (req, res) => {
  const results = await db.getAllPublisher();
  res.status(200).json({ results });
});

app.get("/publisher/:id", async (req, res) => {
  const results = await db.getPublisherById(req.params.id);
  res.status(200).json({ results });
});

app.post("/publisher", async (req, res) => {
  const results = await db.addPublisher(req.body);
  res.status(200).json({ results });
});

app.delete("/publisher/:id", async (req, res) => {
  const results = await db.deletePublisher(req.params.id);
  res.status(200).json({ results });
});

// get publisher from game id
app.get("/game-publisher-connection/:id", async (req, res) => {
  const results = await db.getPublisherFromGame(req.params.id);
  res.status(200).json({ results });
});

// add publisher to game
app.post("/game-publisher-connection/", async (req, res) => {
  const results = await db.addPublisherToGame(req.body);
  res.status(200).json({ results });
});

// remove publisher from game
app.delete("/game-publisher-connection/:id", async (req, res) => {
  const results = await db.removePublisherFromGame(req.params.id);
  res.status(200).json({ results });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
