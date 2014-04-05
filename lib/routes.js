'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    routes= require('./controllers/routes'),
    states=require('./controllers/states');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/routes',routes.create);
  app.get('/api/routes:id',routes.show);
  app.get('/api/ownedRoutes/:username',routes.getOwnedByUsername);
  app.get('/api/assignedRoutes/:username', routes.getAssignedRoutesByUsername);

  app.post('/api/states',states.create);
  app.get('/api/states:id',states.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
  app.get('/login');
  app.get('/signUp');
};
  var geoJsonExample={ "type": "FeatureCollection",
    "features": [
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [43.262984, -2.935045]},
        "properties": {"prop0": "value0"}
      },
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [43.334124, -3.116392]},
        "properties": {"prop0": "value0"}
      },
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [43.283075, -3.700176]},
        "properties": {"prop0": "value0"}
      }
    ]
  };
  var point={ type : "Point", coordinates : [43.262698, -2.933833] };
  var locs=[];
  for(var i=0;i<geoJsonExample.features.length;i++){
    locs.push(geoJsonExample.features[i].geometry.coordinates);
  }
  console.log(locs);
  var jsonTest={description:'Prueba1', publicRoute:true , owner:'aritz', assigned_routes: ['hola21313'], route:geoJsonExample, locs:locs};
   var jsonTest2={description:'Prueba1', publicRoute:true , owner:'aritz', assigned_routes: ['hola21313'], route:geoJsonExample, locs:locs2};
  /*jsonTest[description]='hola';
  jsonTest[publicRoute]=true;
  jsonTest[owner]='aritz';
  jsonTest[assigned_routes]=['hola','aritz'];
  jsonTest[route]='asdadas';*/
  routes.create2(jsonTest);
  routes.getNearby2('aritz',point);

