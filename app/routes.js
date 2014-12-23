 //   app/routes.js
    
var voteTimer = require('./votetimer');

module.exports = function(app, players) {

    // server routes ===========================================================
    // Voting Window Status
    app.get('/api/votewindow', function(req, res) {
        //console.log('/api/votewindow: ' + voteTimer);
        if (voteTimer.votingWindowOpen()) {
            res.json({"window": 1, "pins" : players.getPins()});
        } else {
            res.json({"window": 0});
        }
    });    


    // Place vote - now handled directly with ES server
    app.post('/api/place', function(req, res) {
    	console.log(req.body.vote);
    });    


    // PIN authenication 
    app.post('/api/verify', function(req, res) {
        console.log("handle /api/verify, PIN: " + req.body.pin);

        var validPin = players.validatePin(req.body.pin);

        players.redeemPin(req.body.pin);

        if (validPin) {
            res.json({"message": "verified"});
        } else {
            res.json({"message": "notverified"});
        }
    });        

    // Route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};
