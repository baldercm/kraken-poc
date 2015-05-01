'use strict';

var mongoose = require('mongoose');
var log = require('pine')();

function bootstrap(conf) {
  mongoose.connect(conf.dbUri);

  mongoose.connection.once('open', function() {
    log.debug('Mongoose connected to ' + conf.dbUri);
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
