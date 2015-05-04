'use strict';

var express = require('express');
var kraken = require('kraken-js');
var options = require('./lib/options')();

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
var app;

app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
  console.log('Application ready to serve requests.');
  console.log('Environment: %s', app.kraken.get('env:env'));
});
