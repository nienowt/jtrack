'use strict';

require('angular');
require('angular-route');

var app = angular.module('app', ['ngRoute']);

require('./services/auth-service')(app);
require('./services/error-service')(app);
require('./controllers/user-control')(app);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: './templates/landing.html',
    controller: 'UserController',
    controllerAs:'userCtrl'
  });
}]);
