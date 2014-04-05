'use strict';

angular.module('hackForGood2014App')
  .controller('RoutesCtrl', function ($scope, Route, Auth) {
     $scope.routes = [];
     Route.query().$promise.then(function sucess(data){
        for(var i = 0, len = data.length; i < len; i++){
            $scope.routes.push(data[i]);
        }
     });


     $scope.subscribe = function(route){
     	Route.subscribe({id: route._id}).$promise.then(
            function success(data){
                route.subscribed = true;
            }
        );
     };

    $scope.unsubscribe = function(route){
      Route.unsubscribe({id: route._id}).$promise.then(
        function success(data){
            route.subscribed = false;
        }
      );
    };


  });