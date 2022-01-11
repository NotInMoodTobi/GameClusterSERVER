const knex = require('knex');

// game functions
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

// genre functions
function getAllGenre() {
    return knex('genre').select('*');
}

// todo: in connection eintragen
function createGenre(genre) {
    return knex('genre').insert(genre);
}

// todo: in connection eintragen
function updateGenre(id, genre) {
    return knex('genre').where('game_id', id).update(game);
}

// todo: aus der connection löschen
function deleteGenre(id) {
    return knex('genre').where('id', id).del();
}


module.exports = {
    //games
    createGame,
    getAllGames,
    updateGame,
    deleteGame,
    //genre
    getAllGenre
};