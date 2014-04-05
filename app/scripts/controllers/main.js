'use strict';

angular.module('hackForGood2014App')
  .controller('MainCtrl', function ($scope, Route, leafletData) {

  	leafletData.getMap().then(function (map) {

      Route.nearby().$promise.then(
        function success(data){
          console.log(data);
        }, function error(err){
          console.log(err);
        }
      );

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
        }

    		$scope.currentPosition.setLatLng(L.latLng(position.coords.latitude, position.coords.longitude));
        map.setView([position.coords.latitude, position.coords.longitude], 15);
    	}
  
    	$scope.getLocation();
    });
  });
