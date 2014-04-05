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
  .controller('MyCreatedRoutesCtrl', function ($scope, $http) {
    $scope.routes = [{
      name: 'Ruta de prueba',
      description: 'Descripcion muy larga de todo este tema, no me voy a poner a copiar un lorem ipsum ahora.',
      id: '1122312425253',
      author: {
        name: 'Administrador',
        email: 'admin@hackforgood.com'
      }
     }];
    //Download
  });

angular.module('hackForGood2014App')
  .controller('MySubscribedRoutesCtrl', function ($scope, $http) {
    $scope.routes = [{
      name: 'Ruta de prueba',
      description: 'Descripcion muy larga de todo este tema, no me voy a poner a copiar un lorem ipsum ahora.',
      id: '1122312425253',
      author: {
        name: 'Administrador',
        email: 'admin@hackforgood.com'
      }
     }];
    //Download
  });