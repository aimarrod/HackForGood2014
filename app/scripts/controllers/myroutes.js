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

    $scope.show = function(route){
      $scope.geojson = {
        data: route.route
      }
    }
  });

angular.module('hackForGood2014App')
  .controller('MySubscribedRoutesCtrl', function ($scope, Route) {
    Route.subscribed().$promise.then(
      function success(data){
        $scope.routes = data;
      });

    $scope.unsubscribe = function(route){
      Route.unsubscribe({id: route._id}).$promise.then(
        function success(data){
          $scope.routes.splice($scope.routes.indexOf(route),1);
        }
      );
    };
  });