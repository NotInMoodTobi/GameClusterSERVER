const express = require('express');
const { get } = require('request');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./apiFunctions');

const steam = require('./routes/steam/steamHelper');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// router
const gameRouter = require('./routes/game/game');
const genreRouter = require('./routes/genre/genre');
const gameGenreMapRouter = require('./routes/game_genre_map/game_genre_map');
const publisherRouter = require('./routes/publisher/publisher');
const gamePublisherMapRouter = require('./routes/game_publisher_map/game_publisher_map');
const steamRouter = require('./routes/steam/steam');

// router middleware
app.use('/game', gameRouter);
app.use('/genre', genreRouter);
app.use('/game_genre_map', gameGenreMapRouter);
app.use('/publisher', publisherRouter);
app.use('/game_publisher_map', gamePublisherMapRouter);
app.use('/steam', steamRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
