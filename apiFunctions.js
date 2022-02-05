const knex = require('knex');
const dbConnection = require('./knex_connection');

/*
// --- game functions ---
function createGame(game) {
    return knex('game').insert(game);
}

function getAllGames() {
    return knex('game').select('*');
}

function updateGame(id, game) {
    return knex('game').where('game_id', id).update(game);
}

function deleteGame(id) {
    isDeleted = !(knex('game').where('game_id', id).select(deleted)); // revert 'delted' flag
    return knex('game').where('game_id', id).update({deleted: isDeleted});
}
*/

// --- genre functions ---
function getAllGenre() {
    return dbConnection('genre').select('*');
}

// create genre
function createGenre(name) {
    return dbConnection('genre').insert(name);
}

// add genre to genre_game_connection
function addGenreToGame(game_id, genre_id) {
    // todo: abfangen bei duplikat
    return dbConnection('game_genre_connection').insert(game_id, genre_id);
}

// remove genre from game
function removeGenreFromGame(game_id, genre_id) {
    return dbConnection('game_genre_connection')
    .where('fk_game_id', game_id)
    .andWhere('fk_genre_id', genre_id)
    .del();
}

function getGenreFromGame(game_id) {
    return dbConnection('game_genre_connection')
    .innerJoin('genre',
    'game_genre_connection.fk_genre_id',
    '=',
    'genre.genre_id')
}

// hard delete genre & delete genre from all games
function deleteGenre(genre_id) {
    return dbConnection('genre').where('id', id).del();
}

module.exports = {
    /*games
    createGame,
    getAllGames,
    updateGame,
    deleteGame,*/

    //genre operations
    getAllGenre,
    createGenre,
    addGenreToGame,
    removeGenreFromGame
};