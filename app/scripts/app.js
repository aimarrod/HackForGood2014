
var app = angular.module('hackForGood2014App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ui.router',
  'leaflet-directive'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'partials/main.html',
      controller: 'MainCtrl'
    })
    
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      controller: 'SignupCtrl'  
    })

    .state('editor', {
      url: '/editor',
      templateUrl: 'partials/editor.html',
      controller: 'EditorCtrl'  
    })

    .state('routes', {
      url: '/routes',
      templateUrl: 'partials/routes.html',
      controller: 'RoutesCtrl'  
    })

    .state('myroutes', {
      url: '/myroutes',
      templateUrl: 'partials/myroutes.html',
      controller: 'MyRoutesCtrl'  
    })

    .state('myroutes.created', {
      url: '/created',
      templateUrl: 'partials/mycreated.html',
      controller: 'MyCreatedRoutesCtrl'  
    })

    .state('myroutes.subscribed', {
      url: '/subscribed',
      templateUrl: 'partials/mysubscribed.html',
      controller: 'MySubscribedRoutesCtrl'  
    });


    $urlRouterProvider.otherwise('/');
});


app.run( function ($rootScope, $location, $modal, $state, Auth) {

    var loginRequired = ['settings', 'upload', 'editor'];

    $rootScope.$on( "$stateChangeStart", function(event, next, current) {
        if(loginRequired.indexOf(next.name) > -1 && !Auth.isLoggedIn()){ 
          event.preventDefault();

          var modalInstance = $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl',
          });

          modalInstance.result.then(function (selectedItem) {
            $state.go(next.name);
          }, function () {
            if(!current.name)
              $state.go('home');
          });
        }

        if(Auth.isLoggedIn() && next.name=="signup"){
          event.preventDefault();
          $state.go('home');
        }
    });



});