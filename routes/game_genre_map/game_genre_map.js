const express = require('express');
const router = express.Router();
const dbConnection = require('../../knex_connection');

// TODO: testen

// add genre to game
router.post(async (req, res) => {
	try {
		const result = await dbConnection('game_genre_connection').insert({
			fk_game_id: req.body.game_id,
			fk_genre_id: req.body.genre_id,
		});
		res.send({ success: true, results });
	} catch (err) {
		res.send({ success: false, error: err.message });
	}
});

router
	.route('/:id')
	// get all genre from game
	.get(async (req, res) => {
		try {
			const results = await dbConnection('game_genre_connection')
				.select('*')
				.where({ fk_game_id: req.params.id });
			res.send(results);
		} catch (err) {
			res.send({ error: err.message });
		}
	})
	// delete genre from game
	.delete(async (req, res) => {
		try {
			const result = await dbConnection('game_genre_connection')
				.where({
					fk_genre_id: req.params.id,
				})
				.delete();
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	});

module.exports = router;
