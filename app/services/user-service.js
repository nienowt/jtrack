module.exports = function(app){
  app.factory('UserService', ['$http', '$window', function($http, $window) {
    let userData;

    let user = {
      getUser(id, cb) {
        cb || function(){};
        $http.get('/jobs/user/'+ id)
          .then((res) => {
            userData = res.data;
            cb(null, res);
          }, (err) => {
            cb(err);
          })
      },
      getUserData(){
        return userData || 'Data Not Found';
      }
    };
    return user;
  }]);
};
