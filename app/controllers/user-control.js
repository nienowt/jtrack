module.exports = (app) => {
  app.controller('UserController', ['AuthService', 'ErrorService','UserService', '$location', function(AuthService, ErrorService, UserService, $location) {

    const vm = this;
    vm.error = ErrorService();
    vm.user;

    vm.signUp = function(user){
      AuthService.newUser(user, (err, res) => {
        console.log(res)
        if(err) return  vm.error = ErrorService(err);
        $location.path('/home');
        vm.error = null;
      });
    };

    vm.signIn = function(user){
      AuthService.signIn(user, (err, res) => {
        console.log(err, res)
        if(err) return vm.error = ErrorService('Invalid Email or Password');
        $location.path('/home');
        vm.error = null;
      });
    };

    vm.signOut = function(){
      AuthService.logout();
      $location.path('/');
    };

    vm.getUser = function(){
      UserService.getUser(AuthService.getId(), (err, res) => {
        console.log(err, res);
        if(err) return vm.error = ErrorService(err);
        console.log(res)
        vm.user = res;
      })
    }
  }])
}
