'use strict';

var kraken = require('kraken-js');
var express = require('express');
var database = require('../lib/database');
var options = require('../lib/options')();

function serverStartup(done) {
  var app = express();
  app.on('start', done);
  app.use(kraken({
    basedir: process.cwd(),
    onconfig: options.onconfig
  }));

  return app.listen(1337);
}

after(function(done) {
  database.shutdown(done);
});

module.exports.startup = serverStartup;
