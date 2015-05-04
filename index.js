'use strict';

var express = require('express');
var kraken = require('kraken-js');
var database = require('./lib/database');
var options = require('./lib/options');

var app;


app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
  console.log('Application ready to serve requests.');
  console.log('Environment: %s', app.kraken.get('env:env'));
});
