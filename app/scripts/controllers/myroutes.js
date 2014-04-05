'use strict';

angular.module('hackForGood2014App')
  .controller('MyRoutesCtrl', function ($scope, $location, $modal, $state, Auth) {
    $scope.menu = [
      {
        'title': 'Creadas',
        'state': 'myroutes.created',
        'icon': ''
      }, {
        'title': 'Suscritas',
        'state': 'myroutes.subscribed',
        'icon': ''
      }];
    });

angular.module('hackForGood2014App')
  .controller('MyCreatedRoutesCtrl', function ($scope, Route) {
    Route.owned().$promise.then(
      function success(data){
        $scope.routes = data;
      });
  });

angular.module('hackForGood2014App')
  .controller('MySubscribedRoutesCtrl', function ($scope, $http) {
    Route.subscribed().$promise.then(
      function success(data){
        $scope.routes = data;
      });
    //Download
  });