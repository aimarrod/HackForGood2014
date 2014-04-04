'use strict';

angular.module('hackForGood2014App')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
