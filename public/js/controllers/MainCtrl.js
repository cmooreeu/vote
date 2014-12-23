
angular.module('MainCtrl', []).controller('MainController',  [ '$scope', '$votingNotification', function($scope, $votingNotification) {

	$scope.tagline = '';	
}]);


window.addEventListener('load', function () {
  // At first, let's check if we have permission for notification
  // If not, let's ask for it
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }

});