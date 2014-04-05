'use strict';

angular.module('hackForGood2014App')
  .controller('MainCtrl', function ($scope, $http) {

  	$scope.markers = {};

  	$scope.getLocation = function(){
  		if (navigator.geolocation){
    		navigator.geolocation.getCurrentPosition(getPos);
    	} else {
    		$scope.$noNavigation = true;
    	}
  	};

  	function getPos(position){
  		console.log(position.coords);
  		$scope.markers.center = {
  			lat: position.coords.latitude,
  			lon: position.coords.longitude,
  			message: 'Estas aqui',
  		}
  	}


  	$scope.getLocation();
  });
