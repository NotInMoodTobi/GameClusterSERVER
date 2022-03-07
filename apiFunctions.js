const knex = require('knex');
const dbConnection = require('./knex_connection');






// add genre to game(genre_game_connection)
// TODO: results überarbeiten
// TODO: abfangen bei duplikat -> https://stackoverflow.com/questions/16460397/sql-insert-into-table-only-if-record-doesnt-exist
function addGenreToGame(game_genre) {
    return dbConnection('game_genre_connection').insert(game_genre);
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
    if(publisher_id != 1) {
        return dbConnection('publisher').del().where('publisher_id', publisher_id);
    } else {
        return "You can't delete publisher_id=1";
    }
}

// get publisher from game_id
function getPublisherFromGame(publisher_id) {
    return dbConnection('game_publisher_connection')
    .select('publisher.publisher_id', 'publisher.name')
    .innerJoin('publisher',
    'game_publisher_connection.fk_publisher_id',
    '=',
    'publisher.publisher_id')
    .where('game_publisher_connection.fk_game_id', publisher_id);
}

// add publisher to game
function addPublisherToGame(publisher_genre) {
    return dbConnection('game_publisher_connection').insert(publisher_genre);
}

// remove publisher from game
// TODO: bedinung hinzufügen dass game_id & publisher:id einen wert benötigen, sonst kann unsinn passieren
function removePublisherFromGame(publisher_genre) {
    // if(publisher_genre.game_id && publisher_genre.publisher_id) ...
    return dbConnection('game_publisher_connection').del().where(publisher_genre);
}

module.exports = {
    // games functions
    createGame,
    getAllGames,
    getGameById,
    // updateGame,
    // deleteGame,

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
    deletePublisher,
    getPublisherFromGame,
    addPublisherToGame,
    removePublisherFromGame
    
};