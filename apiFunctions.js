const knex = require('knex');
const dbConnection = require('./knex_connection');

// create Game
function createGame(game) {
    return dbConnection('game').insert(game);
}

// delete Game
/*function deleteGame(id) {
    isDeleted = dbConnection('game').where('game_id', id).select('is_deleted'); // revert 'delted' flag
    console.log("isDeleted: " + isDeleted)
    return dbConnection('game').where('game_id', id).update({is_deleted: isDeleted});
}*/

//update game with given id
function updateGame(id, game) {
    return dbConnection('game').where('game_id', id).update(game);
}

// get all games
function getAllGames() {
    return dbConnection('game').select('*');
}

// --- genre functions ---
function getAllGenre() {
    return dbConnection('genre').select('*');
}

// create genre
function createGenre(name) {
    return dbConnection('genre').insert(name);
}

// add genre to genre_game_connection
function addGenreToGame(ids) {
    // todo: abfangen bei duplikat,String zu int wandlung evtl
    return dbConnection('game_genre_connection').insert({'fk_game_id': ids.game_id, 'fk_genre_id': ids.genre_id});
}

// remove genre from game
function removeGenreFromGame(ids) {
    return dbConnection('game_genre_connection')
    .where('fk_game_id', ids.game_id)
    .andWhere('fk_genre_id', ids.genre_id)
    .del();
}

function getGenreFromGame(game_id) {
    return dbConnection('game')
    .select('genre.genre_id', 'genre.name')
    .from('gamecluster.game_genre_connection')
    .innerJoin('genre',
    'game_genre_connection.fk_genre_id',
    '=',
    'genre.genre_id')
    .where('game_genre_connection.fk_game_id', game_id)
}

// hard delete genre & delete genre from all games
function deleteGenre(genre_id) {
    dbConnection('game_genre_connection').where('fk_genre_id',genre_id);
    return dbConnection('genre').where('genre_id', genre_id).del();
}

module.exports = {
    //deleteGame,
    createGame,
    updateGame,
    getAllGames,
    getAllGenre,
    createGenre,
    addGenreToGame,
    removeGenreFromGame,
    getGenreFromGame,
    deleteGenre
};