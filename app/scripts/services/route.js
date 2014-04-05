'use strict';

angular.module('hackForGood2014App')
  .factory('Route', function ($resource) {
    return $resource('/api/routes/:id', {
      id: '@id'
    	}, {
      owned: {
        method: 'GET',
        params: {
          id:'mine'
        },
        isArray: true
      },
      subscribed: {
        method: 'GET',
        params: {
          id:'subscribed'
        },
        isArray: true
      },
      subscribe: {
        method: 'POST'
      },
      unsubscribe: {
        method: 'DELETE'
      }
	 });
  });