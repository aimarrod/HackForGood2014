'use strict';

angular.module('hackForGood2014App')
  .controller('MainCtrl', function ($scope, Route, leafletData) {

  	leafletData.getMap().then(function (map) {

      $scope.submit = function(){
        $scope.complete = true;
      }

    	$scope.getLocation = function(){
    		if (navigator.geolocation){
      		navigator.geolocation.getCurrentPosition(getPos);
      	} else {
      		$scope.$noNavigation = true;
      	}
    	};
  
    	function getPos(position){
        if(!$scope.currentPosition){
          $scope.currentPosition = L.marker([0,0]);
          map.addLayer($scope.currentPosition);
          Route.nearby().$promise.then(
            function success(states){
              for(var i = 0, len = states.length; i < len; i++){
                var ll = L.latLng([states[i].point.coordinates[1], states[i].point.coordinates[0]]);
                if(ll.distanceTo($scope.currentPosition.getLatLng()) < 50){
                  $scope.near = states[i];
                  break;
                }
              }
            }, function error(err){
              console.log(err);
            }
        );
        }

    		$scope.currentPosition.setLatLng(L.latLng(position.coords.latitude, position.coords.longitude));
        map.setView([position.coords.latitude, position.coords.longitude], 15);
    	}
  
    	$scope.getLocation();
    });
  });
