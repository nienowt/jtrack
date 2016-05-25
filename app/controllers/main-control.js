'use strict';

module.exports = (app) => {
  app.controller('MainController', ['$http','$location','$window','$mdConstant','AuthService','UserService', function($http,$location,$window,$mdConstant,AuthService,UserService){
    const vm = this;
    vm.selected = null;
    vm.jobs;
    vm.events; //add events
    vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

    vm.resetJob = function(){
      return {
        date: new Date(),
        company: '',
        position: '',
        requiredSkills: [],
        desiredSkills: [],
        foundOn: '',
        appliedAt: ''
      }
    }

    vm.resetCont = function(){
      return {
        name: '',
        company: '',
        indRecruiter: false,
        email:'',
        phone:''
      }
    }

    vm.job = vm.resetJob();

    vm.contact = vm.resetCont();

    vm.submitJob = function(){
      $http.post('/jobs/user/' + AuthService.getId(), {job: vm.job, contact: vm.contact})
        .then((res) => {
          console.log(res.data)
          vm.jobs.push(res.data.job)
          vm.selected = vm.jobs[vm.jobs.length-1]
        })
        vm.job = vm.resetJob();
        vm.contact = vm.resetCont();
    }

    vm.getUser = function(){
      UserService.getUser(AuthService.getId(), (err, res) => {
        if(err) return vm.error = ErrorService(err);
        console.log(res)
        vm.user = res.data;
        vm.jobs = res.data.jobs;
        vm.selected = vm.jobs[vm.jobs.length-1]
      });
    };

    vm.selectJob = function(job){
      vm.selected = job;
    }

    vm.getUser();

  }])
}
