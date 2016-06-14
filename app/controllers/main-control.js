'use strict';

module.exports = (app) => {
  app.controller('MainController', ['$http','$location','$window','$mdConstant','AuthService','UserService', function($http,$location,$window,$mdConstant,AuthService,UserService){
    const vm = this;
    vm.selected = null;
    vm.responseShow = false; //visibility of 'manage application status'
    vm.evShow = false; //visibility of event form
    vm.activeJobs;
    vm.events = [];
    vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    vm.editJob = {};
    vm.editCont = {};
    vm.newEvent;


    //-----Jobs----// (maybe split into seperate controllers later)
    vm.resetJob = function(){
      return {
        date: new Date(),
        company: '',
        position: '',
        requiredSkills: [],
        desiredSkills: [],
        foundThrough: '',
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
          console.log(res.data);
          vm.activeJobs.push(res.data.job);
          vm.selected = vm.activeJobs[vm.activeJobs.length-1];
        })
        vm.job = vm.resetJob();
        vm.contact = vm.resetCont();
    }

    vm.getUser = function(){
      UserService.getUser(AuthService.getId(), (err, res) => {
        if(err) return vm.error = ErrorService(err);
        console.log(res)
        vm.user = res.data; // not sure this is used anywhere
        vm.events = res.data.events;
        vm.activeJobs = res.data.jobs.filter((j) => {
          return j.interest !== 'No';
        });
        vm.selected = vm.activeJobs[vm.activeJobs.length-1]
      });
    };

    vm.selectJob = function(job){
      vm.selected = job;
      vm.responseShow = false;
    }

    vm.cancelEdit = function(){
      vm.editJob = {};
      vm.editCont = {};
    }

    vm.submitEdit = function(){
      $http.put('/jobs/' + vm.selected._id, {job: vm.editJob, contact: vm.editCont})
      .then((res) => {
        vm.selected = vm.activeJobs[vm.activeJobs.indexOf(vm.selected)] = res.data.job
        vm.selected.contact[0] = vm.activeJobs[vm.activeJobs.indexOf(vm.selected)].contact[0] = res.data.contact
      })
    }

    vm.setInt = function(int){
      $http.put('/jobs/' + vm.selected._id, {job: {interest:int}})
      .then((res) => {
        vm.selected = vm.activeJobs[vm.activeJobs.indexOf(vm.selected)] = res.data.job
        vm.selected.contact[0] = vm.activeJobs[vm.activeJobs.indexOf(vm.selected)].contact[0] = res.data.contact
      })
    }



    //-------Events-----//
    vm.addJobEvent = function(){
      $http.post('/events/user/' + AuthService.getId(), {jobId: vm.selected._id, evt: vm.newEvent})
      .then((res) => {
        console.log(res.data)
        vm.events.push(res.data.evt)
        vm.newEvent = {};
        vm.evShow = false;
      })
    }

    vm.showEvent = function(evt){
      vm.newEvent = {};
      vm.newEvent.type = evt;
      vm.evShow = true;
    }

    vm.cancelEvent = function(){
      vm.evShow = false;
      vm.newEvent = {};
    }

    //--get user info--//

    vm.getUser();

  }])
}
