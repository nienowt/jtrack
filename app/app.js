'use strict';

require('angular');
require('angular-route');
// require('angular-animate');
// require('angular-aria');
require('angular-material');

var app = angular.module('app', ['ngRoute','ngMaterial',]);

require('./services/auth-service')(app);
require('./services/error-service')(app);
require('./services/user-service')(app);
require('./controllers/user-control')(app);
// require('./controllers/job-control')(app);
require('./controllers/main-control')(app);
require('./directives/directives')(app);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: './templates/landing.html',
    controller: 'UserController',
    controllerAs:'userCtrl'
  })
  .when('/signin', {
    templateUrl: './templates/signin.html',
    controller: 'UserController',
    controllerAs: 'userCtrl'
  })
  .when('/home', {
    templateUrl: './templates/home.html',
    controller: 'MainController',
    controllerAs: 'mainCtrl'
  })
}]);
