'use strict';

var database = require('../lib/database');

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
module.exports = function startup(app) {
  return {
    onconfig: function (config, next) {
      /*
       * Add any additional config setup or overrides here. `config` is an initialized
       * `confit` (https://github.com/krakenjs/confit/) configuration object.
       */
      database.bootstrap(config.get('mongodb'));

      next(null, config);
    }
  };

};
