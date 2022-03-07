const express = require('express');
const router = express.Router();
const steam = require('steamHelper');

//router.route('')
// TODO: überarbeiten
// TODO: testen

//SteamAPI Tester
app.get('/steamapps', async (req, res) => {
	const apps = await steam.searchGame(req.body);
	res.status(200).json({ apps });
});
app.get('/steamapps/get-name-from-id', async (req, res) => {
	const apps = await steam.sarchGameNameFromId(req.body);
	res.status(200).json({ apps });
});
app.get('/steamapps/get-details', async (req, res) => {
	const apps = await steam.getAllGameDetails(req.body);
	res.status(200).json({ apps });
});

// TODO: nicht fertig
// load data from steamAPI into game
app.patch('/steam-data-to-game/:id', async (req, res) => {
	// const id = await db.(req.params.id, req.body);
	res.status(200).json({ id });
});


module.exports = router;