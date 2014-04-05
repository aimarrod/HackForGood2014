'use strict';

angular.module('hackForGood2014App')
  .factory('Route', function ($resource) {
    return $resource('/api/routes/:id');
  });