module.exports = (app) => {
  app.controller('MainController', ['$http','AuthService', function($http, AuthService){
    const vm = this;
    vm.jobDate = new Date();
    
  }]);
};
