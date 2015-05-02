'use strict';

var path = require('path');
var confit = require('confit');
var database = require('../lib/database');

before(function() {
  var basedir = path.join(__dirname, '../config');
  confit(basedir).create(function (err, config) {
    database.bootstrap(config.get('mongodb'));
  });
});

after(function() {
  database.shutdown();
});
