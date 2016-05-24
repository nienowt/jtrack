module.exports = (app) => {
  app.controller('JobController', ['$http','$mdConstant','AuthService', function($http, $mdConstant, AuthService){
    const vm = this;
    vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    vm.job = {
      date: new Date(),
      company: '',
      position: '',
      requiredSkills: [],
      desiredSkills: [],
      foundOn: '',
      appliedAt: ''
    };

    vm.submitJob = function(){
      $http.post('/jobs/user/' + AuthService.getId(), {job: vm.job})
        .then((res) => {
          console.log(res)
        })
    }

  }]);
};
