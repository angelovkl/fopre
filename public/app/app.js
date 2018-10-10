var app = angular.module('app', ['ngRecourse', 'ngRoute']);

app.config(function($routeProvider, $locationProvider){
  $routeProvider.when('/', { templateUrl: 'views/partials/main.jade', controller: 'mainCtrl '})
  $locationProvider.html5Mode(true);

});

angular.module('app').controller('mainCtrl,' function($scope){
  $scope.myVar = "Hello Angular";
});
