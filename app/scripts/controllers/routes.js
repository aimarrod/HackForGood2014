'use strict';

angular.module('hackForGood2014App')
  .controller('RoutesCtrl', function ($scope, Route) {
     $scope.routes = [{
     	name: 'Ruta de prueba',
     	description: 'Descripcion muy larga de todo este tema, no me voy a poner a copiar un lorem ipsum ahora.',
     	id: '1122312425253',
     	author: {
     		name: 'Administrador',
     		email: 'admin@hackforfood.com'
     	}
     }];
     Route.query().$promise.then(function sucess(data){
        console.log(data);
     });


     $scope.subscribe = function(route){
     	//Suscribirse a la ruta
     };
  });