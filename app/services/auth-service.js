module.exports = function(app) {
  app.factory('AuthService', ['$http', '$window', function($http, $window) {
    let token;
    let userId;
    let auth = {
      newUser(user, cb) {
        cb || function(){};
        $http.post('/signup', user)
          .then((res) => {
            token = $window.localStorage.token = res.data.token;
            userId = $window.localStorage.user = res.data.id;
            cb(null, res);
          }, (err) => {
            cb(err);
          });
      },
      getToken() {
        return token || $window.localStorage.token;
      },
      getId() {
        return userId || $window.localStorage.user;
      },
      signIn(user, cb) {
        cb || function(){};
        $http.get('/login', {
          headers: {
            authorization: 'Basic ' + btoa(user.email + ':' + user.password)
          }
        }).then((res) => {
          token = $window.localStorage.token = res.data.token;
          userId = $window.localStorage.user = res.data.id;
          cb(null, res);
        }, (err) => {
          cb(err);
        });
      },
      signOut(cb) {
        token = null;
        console.log('yo')
        $window.localStorage.clear();
        if(cb) cb()
      }
    }
    return auth;
  }]);
};
