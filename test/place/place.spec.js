'use strict';

var
  kraken = require('kraken-js'),
  express = require('express'),
  request = require('supertest'),
  expect = require('chai').expect;

describe('/places', function () {
  var mock;

  beforeEach(function (done) {
    var app = express();
    app.on('start', done);
    app.use(kraken({
      basedir: process.cwd()
    }));

    mock = app.listen(1337);
  });


  afterEach(function (done) {
    mock.close(done);
  });


  it('shuld get places', function (done) {
    request(mock)
      .get('/places')
      .expect(function(res) {
        expect(res.status).to.equal(200);
        expect(res.type).to.match(/json/);
        expect(res.body).to.deep.equal({status: 'ok'});
      })
      .end(function (err, res) {
        done(err);
      });
  });

});
