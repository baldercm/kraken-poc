'use strict';

var mongoose = require('mongoose');
var log = require('winston');

function bootstrap(options) {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  mongoose.connect(options.dbUri);

  mongoose.connection.once('open', function() {
    log.debug('Mongoose connected to ' + options.dbUri);
  });

  mongoose.connection.on('error', function(err) {
    log.error('Mongoose connection error: ' + err);
  });
}

function shutdown(done) {
  log.debug('Mongoose shutdown');
  mongoose.connection.close(done);
}

module.exports.bootstrap = bootstrap;
module.exports.shutdown = shutdown;
