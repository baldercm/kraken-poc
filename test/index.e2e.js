'use strict';


var request = require('supertest');
var server = require('./server.e2e');


describe('Index E2E', function () {

  var mock;

  beforeEach(function(done) {
    mock = server.startup(done);
  });

  afterEach(function(done) {
    server.shutdown(mock, done);
  });


  it('should say "hello"', function (done) {
    request(mock)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/"name": "index"/)
      .end(function (err, res) {
        done(err);
      });
  });

});
