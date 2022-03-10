const express = require('express');
const router = express.Router();
const dbConnection = require('../../knex_connection');

// TODO: test router

router
	.route('/')
	.get(async (req, res) => {
		try {
			const games = await dbConnection('game').select('*');
			req.send(games);
		} catch (err) {
			res.send({ error: err.message });
		}
	})
	.post(async (req, res) => {
		try {
			const result = await dbConnection('game').insert({
				name: req.body.name,
				description: req.body.description,
				release_date: req.body.release_date,
				metascore: req.body.metascore,
				required_age: req.body.required_age,
				header_image_path: req.body.header_image_path,
				requirement: req.body.requirement,
				platform_windows: req.body.platform_windows,
				platform_linux: req.body.platform_linux,
				platform_mac: req.body.platform_mac,
				is_favorite: req.body.is_favorite,
				is_deleted: req.body.is_deleted,
			});
			res.send({ success: true, id: result[0] });
		} catch (err) {
			return { error: err.message };
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			const game = await dbConnection('game')
				.select('*')
				.where({ game_id: req.params.id })
				.first();
			res.send(game);
		} catch (err) {
			return { error: err.message };
		}
	})
	.put(async (req, res) => {
		try {
			const result = await dbConnection('game')
				.where({ game_id: req.params.id })
				.first()
				.update({
					name: req.body.name,
					description: req.body.description,
					release_date: req.body.release_date,
					metascore: req.body.metascore,
					required_age: req.body.required_age,
					header_image_path: req.body.header_image_path,
					requirement: req.body.requirement,
					platform_windows: req.body.platform_windows,
					platform_linux: req.body.platform_linux,
					platform_mac: req.body.platform_mac,
					is_favorite: req.body.is_favorite,
					is_deleted: req.body.is_deleted,
				});
			res.send({ result: result, success: true });
		} catch (err) {
			return { success: false, error: err.message };
		}
	})
	// soft delete
	.delete(async (req, res) => {
		try {
			const result = await dbConnection('game')
				.select('*')
				.where({ game_id: req.params.game_id })
				.first()
				.update({ is_deleted: req.body.is_deleted });
		} catch (err) {
			return { success: false, error: err.message };
		}
	});

module.exports = router;
