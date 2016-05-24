module.exports = function(app){
  app.controller('UserController', ['AuthService', 'ErrorService', '$location', function(AuthService, ErrorService, $location) {

    const vm = this;
    vm.error = ErrorService();

    vm.signUp = function(user){
      AuthService.newUser(user, (err, res) => {
        console.log(res)
        if(err) return  vm.error = ErrorService(err);
        $location.path('/home');
        vm.error = null;
      });
    };

    vm.signIn = function(user){
      AuthService.login(user, (err, res) => {
        if(err) return vm.error = ErrorService('Invalid Email or Password');
        $location.path('/home');
        vm.error = null;
      });
    };

    vm.signOut = function(){
      AuthService.logout();
      $location.path('/');
    };
  }])
}
