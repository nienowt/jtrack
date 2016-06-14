'use strict';

module.exports = (app) => {
  app.directive('jobForm', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/job-form.html'
    }
  })
  .directive('custNav', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/nav.html',
      controller: 'UserController',
      controllerAs: 'userCtrl'
    }
  })
  .directive('eventForm', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/event.html'
    }
  })
}
