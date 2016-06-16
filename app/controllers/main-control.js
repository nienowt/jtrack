'use strict';

module.exports = (app) => {
  app.controller('MainController', ['$http','$location','$window','$mdConstant','AuthService','UserService', function($http,$location,$window,$mdConstant,AuthService,UserService){
    const vm = this;
    vm.selectedJob = null;
    vm.selectedEvent = null;
    vm.stagnantApps;
    vm.showStagnant = false; //visibility of 'update stagnant apps bar'
    vm.responseShow = false; //visibility of 'manage application status'
    vm.evShow = false; //visibility of event form
    vm.activeJobs;
    vm.activeEvents = [];
    vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    vm.editJob = {};
    vm.editCont = {};
    vm.newEvent;
    vm.editedEvent = {};

    //------get user information, apps/events etc--//
    vm.getUser = function(){
      UserService.getUser(AuthService.getId(), (err, res) => {
        if(err) return vm.error = ErrorService(err);
        console.log(res)
        vm.user = res.data; // not sure this is used anywhere
        vm.activeEvents = res.data.events;
         //set active jobs
        vm.activeJobs = res.data.jobs.filter((j) => {
          return j.appStatus !== 'Inactive';
        });
        //get jobs more than a week old
        vm.stagnantApps = vm.activeJobs.filter((j) => {
          if(j.date) return (Math.floor(Date.now()/1000/60/60/24)) - (Math.floor(Date.parse(j.date)/1000/60/60/24)) > 7 && j.appStatus != 'Active';
        })
        vm.selectedJob = vm.activeJobs[vm.activeJobs.length-1]
        vm.selectedEvent = vm.activeEvents[vm.activeEvents.length-1]
      });
    };

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
          vm.selectedJob = vm.activeJobs[vm.activeJobs.length-1];
        })
        vm.job = vm.resetJob();
        vm.contact = vm.resetCont();
    }


    vm.selectJob = function(job){
      vm.selectedJob = job;
      vm.responseShow = false;
    }

    vm.cancelEdit = function(){
      vm.editJob = {};
      vm.editCont = {};
    }

    vm.submitEdit = function(){
      $http.put('/jobs/' + vm.selectedJob._id, {job: vm.editJob, contact: vm.editCont})
      .then((res) => {
        console.log(res.data)
        vm.selectedJob = vm.activeJobs[vm.activeJobs.indexOf(vm.selectedJob)] = res.data;
        vm.cancelEdit(); //maybe change to 'clearEdit?'
      })
    }

    vm.setInt = function(int){
      $http.put('/jobs/' + vm.selectedJob._id, {job: {appStatus:int}})
      .then((res) => {
        vm.selectedJob = vm.activeJobs[vm.activeJobs.indexOf(vm.selectedJob)] = res.data;
        // vm.selectedJob.contact[0] = vm.activeJobs[vm.activeJobs.indexOf(vm.selectedJob)].contact[0] = res.data.contact
      })
    }

    vm.manageStag = function(res){
      if(res == 'y') return vm.showStagnant = true;
      return vm.stagnantApps = [];
    }

    vm.handleStag = function(job, int){
      $http.put('/jobs/' + job._id, {job: {appStatus: int}})
      .then((res) => {
        vm.stagnantApps = vm.stagnantApps.filter((j) => {
          return j !== job;
        })
        if(int == 'Inactive') {
          vm.activeJobs = vm.activeJobs.filter((j) => {
            return j !== job;
          })
        } else {
          vm.activeJobs[vm.activeJobs.indexOf(job)] = res.data
        }
        vm.selectedJob = vm.activeJobs[vm.activeJobs.length-1]
      })
    }



    //-------Events-----//
    vm.addJobEvent = function(){
      $http.post('/events/user/' + AuthService.getId(), {jobId: vm.selectedJob._id, evt: vm.newEvent})
      .then((res) => {
        console.log(res.data)
        vm.activeEvents.push(res.data.evt)
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

    vm.selectEvent = function(evt){
      vm.selectedEvent = evt;
    }

    vm.editEvent = function(){
      $http.put('/events/' + vm.selectedEvent._id, vm.editedEvent)
      .then((res) => {
        console.log(res)
        vm.selectedEvent = vm.activeEvents[vm.activeEvents.indexOf(vm.selectedEvent)] = res.data;
        vm.editedEvent = {};
      })
    }

    vm.cancelEventEdit = function(){
      vm.editedEvent = {};
    }

    //--get user info--//

    vm.getUser();

  }])
}
