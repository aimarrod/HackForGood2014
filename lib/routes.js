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
  app.get('/api/routes',routes.showPublicRouteList);
  app.get('/api/routes:id',routes.show);
  app.get('/api/ownedRoutes/:username',routes.getOwnedByUsername);
  app.get('/api/assignedRoutes/:username', routes.getAssignedRoutesByUsername);


  app.post('/api/states',states.create);
  app.get('/api/states/:id',states.show);

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

