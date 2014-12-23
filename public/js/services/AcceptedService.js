angular.module('AcceptedService', []).factory('Accepted', ['$http', function($http) {

    return {
        // call to POST and create a new vote
        create : function(voteData) {
            return $http.post('/api/accepted', voteData);
        },

        // call to DELETE a vote
        delete : function(id) {
            return $http.delete('/api/accepted/' + id);
        }
    }       	

}]);