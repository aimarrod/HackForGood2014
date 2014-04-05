'use strict';

angular.module('hackForGood2014App')
  .controller('NavbarCtrl', function ($scope, $location, $modal, $state, Auth) {
    $scope.menu = [
              {
                'title': '',
                'state': 'home',
                'icon':'home fa-2x'
              }, {
                'title': 'Crear ruta',
                'state': 'editor',
                'icon': 'plus'
              }, {
                'title': 'Buscar rutas',
                'state': 'routes',
                'icon': 'search'
              }];
    $scope.state = $state;

    /** Open login modal */
      $scope.login = function login(){
        var modalInstance = $modal.open({
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl',
        });

        modalInstance.result.then(function() {
          if($state.includes('signup')) 
            $state.go('home');
        });
      };
      
    $scope.logout = function() {
      Auth.logout();
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
