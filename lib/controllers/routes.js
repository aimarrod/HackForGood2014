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

  Route.find(function (err, routes) {
    if (err) return next(err);
    if (!route) return res.send(404);
    
  });
};