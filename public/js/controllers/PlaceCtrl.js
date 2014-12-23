
angular.module('PlaceCtrl', []).controller('PlaceController', ['$scope', '$location', '$rootScope', 'Place', '$es', '$http',  function($scope, $location, $rootScope, Place, $es, $http) {

  $scope.tagline = 'Place Your Vote';
  $scope.authenticated = 0;
	$scope.pin = "0000";
  $scope.votingPins = "";

	$scope.councilors = [
	  {label: 'Jac Asher', selected: false},
	  {label: 'Ruth Atkin', selected: false},
	  {label: 'Scott Donahue', selected: false},
	  {label: 'Nora Davis', selected: false},
	  {label: 'Dianne Martinez', selected: false}
	];


	$scope.currentCouncilerIndex = 0; // Whatever the default selected index is, -1 : no selection.

  $scope.init = function() {
    $scope.authenticated = 0;
  };



  $scope.selectionClicked = function ($index) {
    	$scope.currentCouncilerIndex = $index;
  };

	$scope.voted = function ($index) {
    	$scope.sendVote($index);
	};

  	$scope.authenticate = function() {
  		var pinObject = { "pin" : $scope.pin};
  		var verifyResult = Place.verify(pinObject).success(function(data, status, headers, config) {
    		  // this callback will be called asynchronously when the response is available  			
        	if ( data.message == "verified" ) {
            $scope.authenticated = 1;
        	} else {
        		$scope.authenticated = -1;
        	}
      	}).error(function(data, status, headers, config) {
    		  // called asynchronously if an error occurs or server returns response with an error status.      		
	        alert("Pin could not be verify" );
          $scope.authenticated = -1;
      	});        
  	};

  	$scope.sendVote = function($index) {
          // this callback will be called asynchronously when the response is available       
          var vote = { "vote" : $scope.councilors[$index].label };
          //alert($scope.councilors[$index].label);

          var milliseconds = (new Date).getTime();
          var timeStamp = (new Date).toJSON();
          $es.bulk({
            body: [
              // action description
              { index:  { _index: 'myindex', _type: 'mytype', _id: milliseconds } },
              // the document to index
              { vote: $scope.councilors[$index].label, ts: timeStamp},
            ]
          }, function (err, resp) {
            if ( resp.errors == true) {
                 alert("voting error: " + JSON.stringify(resp));
            } else {
                // Vote accepted
                window.clearTimeout(pollVotingWindowTimer);
                $location.path("/accepted").replace();
                $scope.$apply();
            }
          });             
  	};

  	$scope.pinEntry = function () {
      $scope.authenticate();
  	};  	


    var pollVotingWindow = function() {

      var verifyResult = Place.votingWindowOpen().success(function(data, status, headers, config) {
          // this callback will be called asynchronously when the response is available.       
          if ( data.window == 1 ) {
            // open
            pollVotingWindowTimer = setTimeout( pollVotingWindow, 2000);

            $scope.votingPins = "Tokens: ";
            for (var i = 0; i < data.pins.length; i++) {
                if (data.pins[i].pin != "XXXX") {
                  $scope.votingPins += data.pins[i].pin + ", ";
                }
            };   
            if ( $scope.votingPins== "Tokens: ") {
              $scope.votingPins = "No remaining tokens for this voting session";
            }

          } else {
            //closed 
            $scope.votingPins = "";
            window.clearTimeout(pollVotingWindowTimer);
            $location.path("/closed").replace();
            $scope.$apply();            
          }
        }).error(function(data, status, headers, config) {
          // called asynchronously if an error occurs or server returns response with an error status.          
          $scope.votingPins = "";
          window.clearTimeout(pollVotingWindowTimer);
          $location.path("/closed").replace();
          $scope.$apply();                      
        });        
    };

    var pollVotingWindowTimer = setTimeout( pollVotingWindow, 0);


}]);