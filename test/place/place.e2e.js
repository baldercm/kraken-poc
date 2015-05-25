'use strict';

var
  _ = require('underscore'),
  request = require('supertest'),
  expect = require('chai').expect,
  Place = require('../../models/place-model').Place,
  server = require('../server.e2e');

describe('Places E2E', function () {
  var places = [];
  var mock;

  before(function(done) {
    mock = server.startup(done);
  });

  before(function(done) {
    Place.create(
      {
        name: 'Place 1',
        location: [40.00, 30.00],
        beaconDevice : {
          majorId : '1234',
          minorId : '2345'
        }
      },
      { name: 'Place 2', location: [40.00, 30.00] },
      { name: 'Place 3', location: [55.00, 55.00] },
      function(err, place1, place2, place3) {
        if (err) {
          throw err;
        } else {
          places.push(place1);
          places.push(place2);
          places.push(place3);

          done();
        }
      }
    );
  });

  after(function(done) {
    Place.remove({}, done);
  });

  after(function(done) {
    mock.close(done);
  });

  describe('GET /places/:id', function() {

    context('on valid id', function() {
      it('should get the place', function(done) {
        var place = places[0];

        request(mock)
          .get('/places/' + place.id)
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200);
            expect(res.type).to.match(/json/);
            expect(res.body.id).to.equal(place.id);
            expect(res.body.name).to.equal(place.name);
          })
          .end(done);
      });
    });

    context('on wrong id', function() {
      it('should get an error', function(done) {
        request(mock)
          .get('/places/anyWrongId')
          .auth('noderest', 'secret')
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).to.equal(400);
            expect(res.type).to.match(/json/);
            done();
          });
      });
    });
  });

  describe('GET /places', function() {

    context('on empty query', function() {
      it('should get all places', function(done) {
        request(mock)
          .get('/places')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200);
            expect(res.type).to.match(/json/);
            expect(res.body).to.be.instanceof(Array);
            expect(res.body.length).to.equal(3);
          })
          .end(done);
      });
    });
  });

  describe('GET /places?latitude=1.23&longitude=2.34', function() {

    context('on valid query', function() {
      it('should get geonear places', function(done) {
        request(mock)
          .get('/places?latitude=40.00&longitude=30.00')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200);
            expect(res.type).to.match(/json/);
            expect(res.body).to.be.instanceof(Array);
            expect(res.body.length).to.equal(2);

            var placeNames = _.pluck(res.body, 'name');
            expect(placeNames).to.include.members(['Place 1', 'Place 2']);
            expect(placeNames).not.to.include.members(['Place 3']);
          })
          .end(done);
      });
    });

    context('on invalid query', function() {
      it('should get an error', function(done) {
        request(mock)
          .get('/places?latitude=invalid&longitude=invalid')
          .auth('noderest', 'secret')
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).to.equal(400);
            expect(res.type).to.match(/json/);
            done();
          });
      });
    });
  });

  describe('GET /places?beaconMajorId=1234', function() {

    context('on valid query', function() {
      it('should get the place with the beacon majorId', function(done) {
        request(mock)
          .get('/places?beaconMajorId=1234')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200);
            expect(res.type).to.match(/json/);
            expect(res.body).to.be.instanceof(Array);
            expect(res.body.length).to.equal(1);

            var placeNames = _.pluck(res.body, 'name');
            expect(placeNames).to.include.members(['Place 1']);
            expect(placeNames).not.to.include.members(['Place 2', 'Place 3', 'Place 4']);
          })
          .end(done);
      });
    });

    context('on wrong majorId', function() {
      it('should get an empty array', function(done) {
        request(mock)
          .get('/places?beaconMajorId=invalid')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200);
            expect(res.type).to.match(/json/);
            expect(res.body).to.be.instanceof(Array);
            expect(res.body.length).to.equal(0);
          })
          .end(done);
      });
    });
  });

  describe('POST /places', function() {

    context('on valid query', function() {
      it('should get the place with the beacon majorId', function(done) {
        request(mock)
          .get('/places?beaconMajorId=1234')
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200);
            expect(res.type).to.match(/json/);
            expect(res.body).to.be.instanceof(Array);
            expect(res.body.length).to.equal(1);

            var placeNames = _.pluck(res.body, 'name');
            expect(placeNames).to.include.members(['Place 1']);
            expect(placeNames).not.to.include.members(['Place 2', 'Place 3', 'Place 4']);
          })
          .end(done);
      });
    });

    context('on wrong majorId', function() {
      it('should get an empty array', function(done) {
        request(mock)
          .post('/places')
          .send({
            name: 'New Place',
            latitude: 1.23,
            longitude: 2.34,
            beaconDevice: {
              majorId: 'ab123',
              minorId: 'cd456'
            }
          })
          .auth('noderest', 'secret')
          .accept('application/json')
          .expect(function(res) {
            expect(res.status).to.equal(200);
            expect(res.type).to.match(/json/);
            expect(res.body.id).to.be.defined;
          })
          .end(function(err, res) {
            var id = res.body.id;
            request(mock)
              .get('/places/' + id)
              .accept('application/json')
              .expect(function(res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.match(/json/);
                expect(res.body).to.contain({
                  id: id,
                  name: 'New Place',
                  latitude: 1.23,
                  longitude: 2.34
                });
                expect(res.body.beaconDevice.majorId).to.equal('ab123');
                expect(res.body.beaconDevice.minorId).to.equal('cd456');
              })
              .end(done);
          });
      });
    });
  });


});

