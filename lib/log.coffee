'use strict'

winston = require 'winston'

module.exports.bootstrap = (options) ->

  winston.loggers.add 'errors',
    file:
      level: 'error'
      filename: 'kraken-poc.error.log'
      json: false
      maxsize: 5242880 #5MB
      maxFiles: 5
      handleExceptions: true
    console:
      level: 'error'
      handleExceptions: true

  winston.loggers.add 'main',
    file:
      level: options.main.file.level ? 'info'
      filename: 'kraken-poc.log'
      json: false
      maxsize: 5242880 #5MB
      maxFiles: 5
    console:
      level: options.main.console.level ? 'info'
