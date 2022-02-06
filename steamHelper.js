const SteamAPI = require('steamapi');
const steam = new SteamAPI('abc');

//Cache all Steam Apps for fast Filtering
var allSteamApps;
steam.getAppList().then(summary => {
    allSteamApps = summary;
});

var searchGame = function(searchName) {
    //Search REGEX?
    //Result as json?
    //Dynkwl kanskje
    for (var property in allSteamApps) {
        if(allSteamApps[property].name == searchName.searchName) {
            console.log(allSteamApps[property].name)
            return allSteamApps[property].appid
        }
    }
};

var sarchGameNameFromId = function(searchName) {
    //Search REGEX?
    //Result as json?
    //Dynkwl kanskje
    var results = [];
    for (var property in allSteamApps) {
        if(allSteamApps[property].appid == searchName.id) {
            results.push(allSteamApps[property].name);
        }
    }
};

var getAllGameDetails = function(game) {
    return steam.getGameDetails(game.id).then(summary => {
        return summary;
    });
};

module.exports = {
    searchGame,
    allSteamApps,
    sarchGameNameFromId,
    getAllGameDetails
    
};