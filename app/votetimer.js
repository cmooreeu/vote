
var players = require('./players');

var votingWindowOpen = 0;

 // app/players.js
var voteWindows = [ 
    { "dateTime" : 0},
    { "dateTime" : 0},
	{ "dateTime" : 0},    
    { "dateTime" : 0}
];

// app/votetimer.js

exports.votingWindowOpen = function() {
    return votingWindowOpen;
};

var closeVotingWindow = function(){
    votingWindowOpen = 0;
    console.log("closeVotingWindow: " + (new Date).toJSON());
    players.clearPins();
};

var openVotingWindow = function(){
    votingWindowOpen = 1;
    console.log("openVotingWindow: " + (new Date).toJSON());
    players.allocatePins();
    setTimeout(closeVotingWindow, 1000 * 60 * 3);
};


function randomDate() {
	var startTime = new Date();
	startTime.setHours(9);
	startTime.setMinutes(0);
	var endTime = new Date();	
	endTime.setHours(17);
	endTime.setMinutes(59);
    return new Date(startTime.getTime() + Math.random() * (endTime.getTime() - startTime.getTime()));
}

var generateVotingWindowsForToday = function(){

	console.log("generateVotingWindowsForToday");

	voteWindows.map( function(voteWindow) {
	    voteWindow.dateTime = randomDate();

	    //debug 
	    //voteWindows[0].dateTime = new Date();	
	    //voteWindows[0].dateTime.setMinutes(voteWindows[0].dateTime.getMinutes() + 1);

	    console.log(voteWindow.dateTime);
	});

}


var pollVotingWindow = function(){
    var d = new Date();

    console.log("Poll voting windows " +  d);

    // generate vote windows ofr the day
	if ( d.getHours() == 9 && d.getMinutes() == 0) {
		generateVotingWindowsForToday();
	}

    voteWindows.map( function(voteWindow) {
	    if ( voteWindow.dateTime.getHours() == d.getHours()) {
		    if ( voteWindow.dateTime.getMinutes() == d.getMinutes()) {
		    	openVotingWindow();
		    }
	    }
	});

};

generateVotingWindowsForToday();

setInterval(pollVotingWindow, 1000 * 60);
//debug: setTimeout(openVotingWindow, 1000 * 3);




