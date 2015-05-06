'use strict';

var _ = require('underscore');
var log = require('pine')();
var Place = require('../../models/place-model').Place;

module.exports = function(router) {
  router.get('/', find);
  router.post('/', create);
  router.get('/:id', findById);
};

function create(req, res) {
  Place.create({
    name : req.body.name,
    location: [req.body.latitude, req.body.longitude],
    beaconDevice : {
      majorId : req.body.beaconDevice.majorId,
      minorId : req.body.beaconDevice.minorId
    }
  })
    .then(function(place) {
      res.status(200).json({id: place.id});
    }, function(err) {
      res.status(400).json({ error: err });
    })
    .end();
}

function findById(req, res) {
  Place.findById(req.params.id).exec()
    .then(function(place) {
      if (place) {
        res.status(200).json(place);
      } else {
        res.status(204).send();
      }
    }, function(err) {
      res.status(400).json({ error: err });
    })
    .end();
}

function find(req, res) {
  if (req.query.latitude && req.query.longitude) {
    findAround(req, res);
  } else if (req.query.beaconMajorId) {
    findByMajorId(req, res);
  } else {
    findAll(req, res);
  }
}

function findAll(req, res) {
  Place.find({}).exec()
    .then(function(places) {
      res.status(200).json(places);
    }, function(err) {
      res.status(400).json({ error: err });
    })
    .end();
}

function findByMajorId(req, res) {
  Place.find({ 'beaconDevice.majorId': req.query.beaconMajorId }).exec()
    .then(function(places) {
      res.status(200).json(places);
    }, function(err) {
      res.status(400).json({ error: err });
    })
    .end();
}

function findAround(req, res) {
  var
    lat = Number(req.query.latitude),
    lon = Number(req.query.longitude);

  Place.geoNear([lat, lon], { maxDistance : 0.009})
    .then(function(places) {
      res.status(200).json(_.pluck(places, 'obj'));
    }, function(err) {
      log.error(err.message);
      res.status(400).json({ error: err });
    })
    .end();
}
