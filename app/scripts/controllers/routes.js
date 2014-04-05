'use strict';

angular.module('hackForGood2014App')
  .controller('RoutesCtrl', function ($scope, Route) {
     $scope.routes = [];
     Route.query().$promise.then(function sucess(data){
        for(var i = 0, len = data.length; i < len; i++)
            $scope.routes.push(data[i]);
     });


     $scope.subscribe = function(route){
     	Route.subscribe({id: route._id}).$promise.then(
            function success(data){
                console.log(data);
            }
        );
     };
  });