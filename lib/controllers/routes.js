var mongoose = require('mongoose'),
    Route = mongoose.model('Route');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newRoute = new Route(req.body);
  newRoute.save(function(err) {
    if (err) return res.json(400, err);
  });
};
exports.create2 = function (req,next) {
  console.log('paso por aqui');
  var newRoute = new Route(req);
  newRoute.save(function(err) {
    if (err) console.log('error');
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


exports.getNearby = function (req, res, next) {
  var lat = req.params.lat;
  var lon= req.params.lon;
  var username=req.params.username;
  Route.find({assigned_routes: username},function (err, routes) {
    if (err) return next(err);
    if (!routes) return res.send(404);
    console.log(routes);
  });
};

exports.getNearby2 = function (username,next) {
  Route.find({assigned_routes: username},function (err, routes) {
    if (err) return next(err);
    if (!routes) console.log('empty');
    console.log(routes);
  });
};