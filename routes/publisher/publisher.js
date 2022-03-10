const express = require('express');
const router = express.Router();
const dbConnection = require('../../knex_connection');

// TODO: testen

router
	.route('/')
	.get(async (req, res) => {
		try {
			const result = dbConnection('publisher').select('*');
			res.send(result);
		} catch (err) {
			res.send({ error: err.message });
		}
	})
	.post(async (req, res) => {
		try {
			const publisher = dbConnection('publisher').insert({
				name: req.body.name,
			});
			res.send({ success: true, publisher });
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			const publisher = dbConnection('publisher')
				.select('*')
				.where({ publisher_id: id })
				.first();
			res.send({ success: true, id: publisher[0] });
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	})
	.put(async (req, res) => {
		try {
			const result = dbConnection('publisher')
				.where({ publisher_id: id })
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
			const result = dbConnection('publisher')
				.where({ publisher_id: id })
				.first()
				.delete();
                res.send({success:true, result})
		} catch (err) {
			res.send({ success: false, error: err.message });
		}
	});

module.exports = router;
