'use strict';

angular.module('hackForGood2014App')
  .controller('MainCtrl', function ($scope, $http, leafletData) {

  	leafletData.getMap().then(function (map) {

    	$scope.getLocation = function(){
    		if (navigator.geolocation){
      		navigator.geolocation.getCurrentPosition(getPos);
      	} else {
      		$scope.$noNavigation = true;
      	}
    	};
  
    	function getPos(position){
        if(!$scope.currentPosition){
          $scope.currentPosition = L.marker(0,0);
          map.addLayer($scope.currentPosition);
        }

    		$scope.currentPosition.setLatLng(new L.LatLng(position.coords.latitude, position.coords.longitude));
    	}
  
    	$scope.getLocation();
    });
  });
