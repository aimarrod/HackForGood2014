'use strict';

angular.module('hackForGood2014App')
  .controller('RoutesCtrl', function ($scope, Route) {
     $scope.routes = [];
     Route.query().$promise.then(function sucess(data){
        for(var i = 0, len = data.length; i < len; i++)
            $scope.routes.push(data[i]);
     });


     $scope.subscribe = function(route){
     	//Suscribirse a la ruta
     };
  });