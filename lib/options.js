'use strict';

var database = require('../lib/database');
var log = require('../lib/log');

module.exports = function startup() {
  return {
    onconfig: function (config, next) {
      /*
       * Add any additional config setup or overrides here. `config` is an initialized
       * `confit` (https://github.com/krakenjs/confit/) configuration object.
       */
      log.bootstrap(config.get('log'));
      database.bootstrap(config.get('mongodb'));

      next(null, config);
    }
  };

};
