angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/place', {
			templateUrl: 'views/place.html',
			controller: 'PlaceController'
		})

		.when('/closed', {
			templateUrl: 'views/closed.html',
			controller: 'ClosedController'
		})		

		.when('/results', {
			templateUrl: 'views/results.html',
			controller: 'ResultsController'
		})				

		.when('/accepted', {
			templateUrl: 'views/accepted.html',
			controller: 'AcceptedController'
		});


	$locationProvider.html5Mode(true);

}]);