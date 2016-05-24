'use strict';

module.exports = (app) => {
  app.directive('jobForm', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/job-form.html',
      controller: 'JobController',
      controllerAs: 'jobCtrl'
    }
  })
}
