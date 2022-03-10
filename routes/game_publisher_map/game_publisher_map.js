const express = require('express');
const router = express.Router();
const dbConnection = require('../../knex_connection');

router.post(async (req, res) => {
	try {
		const result = dbConnection('game_publisher_connection').insert({
			fk_game_id: req.body.game_id,
			fk_publisher_id: req.body.genre_id,
		});
	} catch (err) {
		res.send({ success: false, error: err.message });
	}
});

router
	.route('/:id')
	// get publisher by game_id
	.get(async (req, res) => {
		try {
			const result = dbConnection('game_publisher_connection')
				.select('*')
				.where({ fk_publisher_id: req.params.id })
				.first();
			res.send(result);
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	})
	// delete publisher from game by game_id
	.delete(async (req, res) => {
		try {
			const result = await dbConnection('game_publisher_connection')
				.where({
					fk_publisher_id: req.params.id,
				})
				.delete();
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	});

module.exports = router;
