
var voteTimer = require('./votetimer');

 // app/players.js
var players = [ 
    { pin : "XXXX"},
    { pin : "XXXX"},
    { pin : "XXXX"},
    { pin : "XXXX"},
    { pin : "XXXX"}
];

// get Pins
exports.getPins = function() {
    return players;
};        

exports.allocatePins = function() {
    players.map( function(player) {
        player.pin = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        console.log("Assign Pin: " + player.pin);
    });
};

// clears Pin
exports.clearPins = function() {
    for (var i = 0; i < players.length; i++) {
        players[i].pin = "XXXX";
    };
};        


// find player matching given pin value
exports.validatePin = function(pinValue) {
    var validPin = 0;
    for (var i = 0; i < players.length; i++) {
        if (players[i].pin == pinValue) {
            validPin = 1;
            break;
        }
    };
    return validPin; 
};    

// redeemPin
exports.redeemPin = function(pinValue) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].pin == pinValue) {
            players[i].pin = "XXXX";
            console.log("Pin redeemed");
            break;
        }
    };
};        

