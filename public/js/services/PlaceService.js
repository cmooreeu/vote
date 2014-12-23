angular.module('PlaceService', []).factory('Place', ['$http', function($http) {

    var factory = {};

    // call to verify voter pin
    factory.verify  = function(votePin) {
            return $http.post('/api/verify', votePin);
        };

    factory.getIP = function() { 
            return $http.get('http://ipinfo.io/json');
        };

    // call to determine server controlled voting window status 
    factory.votingWindowOpen = function() { 
            return $http.get('/api/votewindow');
        };        


    return factory;
}]);