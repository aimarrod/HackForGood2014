var mongoose = require('mongoose'),
    Route = mongoose.model('Route');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var description=req.body.properties.description;
  var name=req.body.properties.name;
  var publicRoute=req.body.properties.isPublic;
  console.log(publicRoute);
  var locs=[];
  for(var i=0;i<geoJsonExample.features.length;i++){
    locs.push(req.features[i].geometry.coordinates);
  }
  var newRouteData={description: description, name: name, publicRoute: publicRoute, owner: req.user, assigned_routes:[], route: req.body, locs: locs};
  var newRoute=new Route(newRouteData);
  newRoute.save(function(err) {
    if (err) return res.json(400, err);
    res.send(200);
  });
};

exports.show = function (req, res, next) {
  var routeId = req.params.id;
  Route.findById(routeId, function (err, route) {
    if (err) return next(err);
    if (!route) return res.send(404);
    res.send(route);
  });
};

exports.showPublicRouteList = function (req, res, next) {
  Route.find({publicRoutes: true}, function (err, routes) {
    if (err) return next(err);
    if (!routes) return res.send(404);
    res.send(routes);
  });
};

exports.getOwnedByUsername = function (req, res, next) {
  var username=req.params.username;
  Route.find({owner: username}, function (err, routes) {
    if (err) return next(err);
    if (!routes) return res.send(404);
    res.send(routes);
  });
};

exports.getAssignedRoutesByUsername = function (req, res, next) {
  var username=req.params.username;
  Route.find({assigned_routes: username}, function (err, routes) {
    if (err) return next(err);
    if (!routes) return res.send(404);
    res.send(routes);
  });
};

exports.addSubscriptor=function(req, res, next){
  var username=req.params.username;
  var routeId=req.params.routeid;
  Route.findById(routeId, function (err, routes) {
    if (err) return next(err);
    if (!routes) return res.send(404);
    route.assigned_routes.push(username);
    route.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
  });

};

exports.getNearby = function (req, res, next) {
  var lat = req.params.lat;
  var lon= req.params.lon;
  var username=req.params.username;
  Route.find({assigned_routes: username},function (err, routes) {
    if (err) return next(err);
    if (!routes) return res.send(404);
  });
};

exports.getNearby2 = function (username, point, next) {
  Route.find({assigned_routes: username},function (err, routes) {
    if (err) return next(err);
    if (!routes) console.log('empty');
    Route.geoNear(point, {maxDistance: 0.1, spherical: true, includeLocs: true}, function(err, results, stats){
      console.log(results);
    });
  });
};