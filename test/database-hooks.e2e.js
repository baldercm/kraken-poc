'use strict';

var database = require('../lib/database');

before(function() {
  database.bootstrap({
    dbUri: 'mongodb://localhost/noderest-e2e'
  });
});

after(function() {
  database.shutdown();
});
