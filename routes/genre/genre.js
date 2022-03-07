const express = require('express');
const router = express.Router();
const dbConnection = require('../../knex_connection');

// TODO: testen

router
	.route('/')
	.get(async (req, res) => {
		try {
			const genre = dbConnection('genre').select('*');
			res.send(genre);
		} catch (err) {
			res.send({ error: err.message });
		}
	})
	.post(async (req, res) => {
		try {
			const result = dbConnection('genre').insert({
				name: res.body.name,
			});
			res.send({ success: true, id: result[0] });
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			const result = dbConnection('genre')
				.select('*')
				.where({ genre_id: req.params.id })
				.first();
			res.send({ success: true, id: result[0] });
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	})
	.put(async (req, res) => {
		try {
			const result = dbConnection('genre')
				.where({ genre_id: req.params.id })
				.first()
				.update({
					name: req.body.name,
				});
			res.send({ success: true, result });
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	})
	.delete(async (req, res) => {
		try {
			const result = dbConnection('genre')
				.where({ genre_id: req.params.id })
				.first()
				.delete();
			res.send({ success: true, result });
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	});

module.exports = router;
