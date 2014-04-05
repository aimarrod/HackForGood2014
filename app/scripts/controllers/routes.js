'use strict';

angular.module('hackForGood2014App')
  .controller('RoutesCtrl', function ($scope, Route, Auth) {
     $scope.routes = [];
     Route.query().$promise.then(function sucess(data){
        for(var i = 0, len = data.length; i < len; i++){
            $scope.routes.push(data[i]);
            if(Auth.isLoggedIn()){
                // FIX THIS
                var user = Auth.currentUser();
                console.log($.inArray(user.name, data[i].assigned_routes));
                if($.inArray(user.name, data[i].assigned_routes))
                    data[i].subscribed = true;
            }
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