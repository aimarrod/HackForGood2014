'use strict';

angular.module('hackForGood2014App')
  .controller('RoutesCtrl', function ($scope, Route) {
     $scope.routes = [];
     Route.query().$promise.then(function sucess(data){
        for(var key in data)
            $scope.routes.push({
                name: data[key].name,
                description: data[key].description,
                owner: {
                    name: data[key].owner.name,
                    owner: data[key].owner.email
                }
            })
     });


     $scope.subscribe = function(route){
     	//Suscribirse a la ruta
     };
  });