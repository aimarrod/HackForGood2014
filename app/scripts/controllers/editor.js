'use strict';

angular.module('hackForGood2014App')
  .controller('EditorCtrl', function ($scope, $modal, leafletData) { // Use route/track/jinkana resource or whatever
        $scope.layers = {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    type: 'xyz'
                }
            }
        };

        $scope.route = { 
            points:[], 
            properties:{} 
        };

        leafletData.getMap().then(function (map) {
			
            var drawLayer = L.featureGroup();

			drawLayer.addTo(map);

			new L.Control.Draw({
				draw: {
					polyline: false,
					polygon: false,
					rectangle: false,
					circle: false
				},
    			edit: {
        			featureGroup: drawLayer,
    			}
			}).addTo(map);

            map.on('draw:created', function (e) {
                $scope.addPoint(null, e.layer);
            });

            $scope.addPoint = function(e, layer){
                var layer = layer;

                var modalInstance = $modal.open({
                    templateUrl: 'partials/pointmodal.html',
                    controller: 'PointModalCtrl',
                });

                modalInstance.result.then(function (point) {
                    drawLayer.addLayer(layer);
                    $scope.route.points.push({layer:layer, properties:point})          
                });
            };

            $scope.submit = function(e){
                if($scope.route.points.length == 0) return;

                var modalInstance = $modal.open({
                    templateUrl: 'partials/routemodal.html',
                    controller: 'RouteModalCtrl',
                });

                modalInstance.result.then(function (route) {
                    var points = $scope.route.points;
                    var geojson = { 
                        type: "FeatureCollection",
                        features: [],
                        properties: route
                    }
                    for(var i = 0, len = points.length; i < len; i++){
                        var feature = points[i].layer.toGeoJSON();
                        feature.properties = points[i].properties;
                        geojson.features.push(feature);
                    }
                    console.log(geojson);
                });
            };
        });
  });

angular.module('hackForGood2014App')
    .controller('PointModalCtrl', function ($scope,  $modalInstance) {
        $scope.point = {};

        $scope.cancel = function(){
            $modalInstance.dismiss();
        }

        $scope.submit = function(){
            if(isValid()){
                $modalInstance.close($scope.point);
            } else {
                $scope.point.$error = "Es necesario introducir una pregunta o descripcion.";
            }
        };

        function isValid(){
            return $scope.point.question;
        }
    });

angular.module('hackForGood2014App')
    .controller('RouteModalCtrl', function ($scope,  $modalInstance) {
        $scope.route = {};

        $scope.cancel = function(){
            $modalInstance.dismiss();
        }

        $scope.submit = function(){
            if(isValid()){
                $modalInstance.close($scope.route);
            } else {
                $scope.point.$error = "Es necesario un titulo.";
            }
        };

        function isValid(){
            return $scope.route.name;
        }
    });