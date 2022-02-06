const knex = require('knex');
const dbConnection = require('./knex_connection');

/*
// --- game functions ---
function createGame(game) {
    return dbConnection('game').insert(game);
}

function getAllGames() {
    return dbConnection('game').select('*');
}

function updateGame(id, game) {
    return dbConnection('game').where('game_id', id).update(game);
}

function deleteGame(id) {
    isDeleted = !(knex('game').where('game_id', id).select(deleted)); // revert 'delted' flag
    return dbConnection('game').where('game_id', id).update({deleted: isDeleted});
}
*/

// --- genre functions ---

// get all genre
function getAllGenre() {
    return dbConnection('genre').select('*');
}

// get genre by id
function getGenreById(genre_id) {
    return dbConnection('genre').select('*').where('genre_id', genre_id)
}

// create genre
function createGenre(name) {
    return dbConnection('genre').insert(name);
}

// add genre to game(genre_game_connection)
// TODO: results überarbeiten
// TODO: abfangen bei duplikat -> https://stackoverflow.com/questions/16460397/sql-insert-into-table-only-if-record-doesnt-exist
function addGenreToGame(game_genre) {
    return dbConnection('game_genre_connection').insert(game_genre);
}

// remove genre from game
// TODO: bedinung hinzufügen dass game_id & genre_id einen wert benötigen, sonst kann unsinn passieren
function removeGenreFromGame(game_genre) {
    return dbConnection('game_genre_connection').del().where(game_genre);
}

// gets all genre from a game
function getGenreFromGame(game_id) {
    return dbConnection('game_genre_connection')
    .select('genre.genre_id', 'genre.name')
    .innerJoin('genre',
    'game_genre_connection.fk_genre_id',
    '=',
    'genre.genre_id')
    .where('game_genre_connection.fk_game_id', game_id);
}

// hard delete genre & delete genre from all games
function deleteGenre(genre_id) {
    return dbConnection('genre').del().where('genre_id', genre_id);
}

// --- publisher functions ---
function getAllPublisher() {
    return dbConnection('publisher').select('*');
}

function getPublisherById(publisher_id) {
    return dbConnection('publisher').select('*').where('publisher_id', publisher_id);
}

function addPublisher(publisher) {
    return dbConnection('publisher').insert(publisher);
}

function deletePublisher(publisher_id) {
    return dbConnection('publisher').del().where('publisher_id', publisher_id);
}

module.exports = {
    /*games
    createGame,
    getAllGames,
    updateGame,
    deleteGame,*/

    // genre functions
    getAllGenre,
    getGenreById,
    createGenre,
    addGenreToGame,
    removeGenreFromGame,
    getGenreFromGame,
    deleteGenre,

    // publisher functions
    getAllPublisher,
    getPublisherById,
    addPublisher,
    deletePublisher
};