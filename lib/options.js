'use strict';

var database = require('../lib/database');

module.exports = function startup() {
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
