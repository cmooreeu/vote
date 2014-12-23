var sampleApp = angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl',  'PlaceCtrl', 'PlaceService', 'AcceptedCtrl', 'AcceptedService', 'ClosedCtrl', 'ResultsCtrl', 'elasticsearch']);

// Create the es service from the esFactory
sampleApp.service('$es', function (esFactory) {
  return esFactory({ host: 'emy1-cmoore1:9210' });
});


sampleApp.service('$votingNotification', ['$http', function($http) {
    var factory = {};

    factory.isVotingWindowOpen = 0;

    // call to determine server controlled voting window status 
    factory.votingWindowOpen = function() { 
            return $http.get('/api/votewindow');
        };        


    // reoccuring poll of voting window status
    factory.pollVotingWindow = function() {

      var verifyResult = factory.votingWindowOpen().success(function(data, status, headers, config) {
          // this callback will be called asynchronously when the response is available.       
          if ( data.window == 1 ) {
            // open
            setTimeout( factory.pollVotingWindow, 2000);

            if ( factory.isVotingWindowOpen != 1) {

                var d = new Date();
                factory.isVotingWindowOpen = 1;
                factory.sendNotification(d.toLocaleDateString() + " " + d.toLocaleTimeString() + " Voting session is now open");
            }
          } else {
            //closed 
            setTimeout( factory.pollVotingWindow, 2000);

            if ( factory.isVotingWindowOpen != 0) {
                factory.isVotingWindowOpen = 0;
                factory.sendNotification("Voting session has closed");
            } 
          }
        }).error(function(data, status, headers, config) {
            //alert("error");
          // called asynchronously if an error occurs or server returns response with an error status.          
            factory.pollVotingWindowTimer = setTimeout( factory.pollVotingWindow, 2000);
        });        
    };

    factory.pollVotingWindow();

    
    // desktop notification of voting window status. 
    factory.sendNotification =  function (notifyMessage) {
      // If the user agreed to get notified
      if (window.Notification && Notification.permission === "granted") {
        var n = new Notification(notifyMessage);
      }

      // If the user hasn't told if he wants to be notified or not
      // Note: because of Chrome, we are not sure the permission property
      // is set, therefore it's unsafe to check for the "default" value.
      else if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
          if (Notification.permission !== status) {
            Notification.permission = status;
          }

          // If the user said okay
          if (status === "granted") {
            var n = new Notification(notifyMessage);
          }

          // Otherwise, we can fallback to a regular modal alert
          else {
            alert(notifyMessage);
          }
        });
      }

      // If the user refuses to get notified
      else {
        // We can fallback to a regular modal alert
        alert(notifyMessage);
      }
    };

    return factory;
}]);