const SteamAPI = require('steamapi');
const steam = new SteamAPI();

//Cache all Steam Apps for fast Filtering
var allSteamApps;
getAllSteamApps();

var getAllSteamApps = function() {
    steam.getAppList().then(summary => {
        allSteamApps = summary;
    });
};

var searchGame = function(searchName) {

}
