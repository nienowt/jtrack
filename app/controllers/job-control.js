// module.exports = (app) => {
//   app.controller('JobController', ['$http','$mdConstant','AuthService','UserService', function($http, $mdConstant, AuthService, UserService){
//
//     const vm = this;
//
//
//
//     vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
//
//     vm.resetJob = function(){
//       return {
//         date: new Date(),
//         company: '',
//         position: '',
//         requiredSkills: [],
//         desiredSkills: [],
//         foundOn: '',
//         appliedAt: ''
//       }
//     }
//
//     vm.resetCont = function(){
//       return {
//         name: '',
//         company: '',
//         indRecruiter: false,
//         email:'',
//         phone:''
//       }
//     }
//
//     vm.job = vm.resetJob();
//
//     vm.contact = vm.resetCont();
//
//     vm.submitJob = function(){
//       $http.post('/jobs/user/' + AuthService.getId(), {job: vm.job, contact: vm.contact})
//         .then((res) => {
//           console.log(res.data)
//         })
//         vm.job = vm.resetJob();
//         vm.contact = vm.resetCont();
//     }
//
//   console.log(UserService.getUserData())
//
//   }]);
// };
