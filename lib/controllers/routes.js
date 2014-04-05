var mongoose = require('mongoose'),
    Route = mongoose.model('Route'),
    State= mongoose.model('State');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var description=req.body.properties.description;
  var name=req.body.properties.name;
  var publicRoute=req.body.properties.isPublic;
  var locs=[];
  for(var i=0;i<req.body.features.length;i++){
    locs.push(req.body.features[i].geometry.coordinates);
  }
  var newRouteData={description: description, name: name, publicRoute: publicRoute, owner: req.user, assigned_routes:[], route: req.body, locs: locs, ownerId:req.user._id};
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
  Route.find({publicRoute: true}, function (err, routes) {
    if (err) return next(err);
    if (!routes) return res.send(404);
    res.send(routes);
  });
};

exports.getOwnedByUsername = function (req, res, next) {
  Route.find({ownerId: req.user._id}, function (err, routes) {
    console.log(err);
    console.log(routes);
    if (err) return next(err);
    if (!routes) return res.send(404);
    res.send(routes);
  });
};

exports.getAssignedRoutesByUsername = function (req, res, next) {
  var username=req.user.name;
  Route.find({assigned_routes: username}, function (err, routes) {
    if (err) return next(err);
    if (!routes) return res.send(404);
    res.send(routes);
  });
};

exports.addSubscriptor=function(req, res, next){
  var username=req.user.name;
  var routeId=req.params.id;
  Route.findById(routeId, function (err, route) {
    if (err) return next(err);
    if (!route) return res.send(404);
    route.assigned_routes.push(username);
    route.save(function(err) {
        if (err) return res.send(400);
        console.log(route.route.features[0]);
        var newState = new State({routeName: route.routeName,pointNumber: 1, user:req.user, username:req.user.name, point: route.route.features[0].geometry, question: route.route.features[0].properties});
        newState.save(function(err) {
          if (err) return res.json(400, err);
        });
        res.send(200);
      });
  });
};

exports.removeSubscriptor=function(req, res, next){
  var username=req.user.name;
  var routeId=req.params.id;
  Route.findById(routeId, function (err, route) {
    if (err) return next(err);
    if (!route) return res.send(404);
    route.assigned_routes.splice(route.assigned_routes.indexOf(username), 1);
    route.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
  });
};
exports.isCorrectAnswer= function(req,res,next){
  var answer=req.body.answer;
  var questionNumber=req.body.questionNumber;
  var routeId=req.body.routeId;
  if(answer.length ==0){
    res.send(200);
  }else{
    Route.findById(routeId, function(err,route){
      if (err) return next(err);
      if (!route) return res.send(404);
      if (req.body.features[questionNumber].properties.answer == answer){
        resn.send(200);
      }else{
        res.send(888);
      }
      
    });
  }
};
exports.getNearby = function (req, res, next) {
  State.find({username: req.user.name}, function(err, states){
    if(err) return res.send(500);
    res.json(200, states);
  });
};
