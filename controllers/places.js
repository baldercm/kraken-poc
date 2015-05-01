'use strict';

var placeApi = require('../apis/places-api').api;

module.exports = function(router) {
  router.get('/', placeApi.find);
  router.get('/:id', placeApi.findById);
};
